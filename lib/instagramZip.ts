// esm 방식으로 JSZip 임포트
import JSZip from "jszip";

export type ParseResult = {
  followers: string[];
  following: string[];
};

function lower(s: string) {
  return s.toLowerCase();
}

function extractUsernames(anyJson: any): string[] {
  const out: string[] = [];

  const visit = (node: any) => {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }

    if (typeof node === "object") {
      // string_list_data: value가 없는 경우 href에서 파싱
      const sld = (node as any).string_list_data;
      if (Array.isArray(sld)) {
        for (const it of sld) {
          // 1) value가 있으면 사용
          if (typeof it?.value === "string" && it.value.trim()) {
            out.push(it.value.trim());
          }
          // 2) value가 없으면 href에서 사용자명을 추출
          else if (typeof it?.href === "string") {
            // 예: https://www.instagram.com/_u/username
            const match = it.href.match(/instagram\.com\/_u\/([^/?]+)/i);
            if (match) {
              out.push(match[1]);
            }
          }
        }
      }

      // 별도로 title 필드에 사용자명이 들어오는 경우
      const t = (node as any).title;
      if (typeof t === "string" && t.trim()) {
        out.push(t.trim());
      }

      // username 필드 처리(기존 코드 유지)
      const u = (node as any).username;
      if (typeof u === "string" && u.trim()) {
        out.push(u.trim());
      }

      Object.values(node).forEach(visit);
    }
  };

  visit(anyJson);

  // 중복 제거, '@' 제거, 공백 트림
  return Array.from(
    new Set(out.map((s) => s.replace(/^@/, "").trim()).filter(Boolean))
  );
}

/**
 * Instagram 다운받은 ZIP 파일에서 followers / following JSON을 추출해
 * 각 배열로 반환하는 함수
 */
export async function parseInstagramZip(zip: JSZip): Promise<ParseResult> {
  const names = Object.keys(zip.files);

  // 경로 구분자를 모두 슬래시로 통일
  const normalized = names.map((n) => n.replace(/\\/g, "/"));

  // followers_1.json, followers_2.json, … 등 모든 followers JSON 찾기
  const followerFiles = normalized.filter((n) =>
    /(^|\/)followers(_\d+)?\.json$/i.test(n)
  );

  // following_1.json, following_2.json 등 모든 following JSON 찾기
  const followingFiles = normalized.filter((n) =>
    /(^|\/)following(_\d+)?\.json$/i.test(n)
  );

  if (followerFiles.length === 0 || followingFiles.length === 0) {
    throw new Error("followers 또는 following JSON 파일을 찾지 못했습니다.");
  }

  const followersAll: string[] = [];
  for (const path of followerFiles) {
    const txt = await zip.file(path)?.async("string");
    if (!txt) continue;
    followersAll.push(...extractUsernames(JSON.parse(txt)));
  }

  const followingAll: string[] = [];
  for (const path of followingFiles) {
    const txt = await zip.file(path)?.async("string");
    if (!txt) continue;
    followingAll.push(...extractUsernames(JSON.parse(txt)));
  }

  return {
    followers: Array.from(new Set(followersAll)),
    following: Array.from(new Set(followingAll)),
  };
}
