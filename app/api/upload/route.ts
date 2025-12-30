import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { parseInstagramZip } from "@/lib/instagramZip";
import { getUnfollowers } from "@/lib/compare";

/**
 * 업로드된 ZIP 파일을 서버에서 처리하는 API
 * 클라이언트는 FormData로 'file' 필드에 ZIP을 전송합니다.
 */
export async function POST(req: NextRequest) {
  try {
    // 1) 업로드된 FormData 파싱
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 전송되지 않았습니다." },
        { status: 400 }
      );
    }

        // File을 ArrayBuffer로 바꾼 뒤 JSZip에 넘긴다
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const { followers, following } = await parseInstagramZip(zip);
    const unfollowers = getUnfollowers(followers, following);

    return NextResponse.json({ followers, following, unfollowers });
  } catch (err) {
    return NextResponse.json(
      { error: "서버 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
