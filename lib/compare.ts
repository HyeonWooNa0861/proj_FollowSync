// lib/compare.ts

/**
 * 내가 팔로우하는데 상대방이 나를 안 팔로우하는 경우를 구함.
 *
 * @param followers  나를 팔로우하는 사람들의 아이디 목록
 * @param following  내가 팔로우하는 사람들의 아이디 목록
 * @returns 언팔로워 목록
 */
export function getUnfollowers(
  followers: string[],
  following: string[]
): string[] {
  return following.filter((username) => !followers.includes(username));
}

/**
 * 상호 팔로우가 아닌 두 케이스를 모두 반환:
 *  - unfollowers: 내가 팔로우하지만 나를 안 팔로우하는 사람
 *  - nonMutual: 나를 팔로우하지만 내가 안 팔로우하는 사람
 */
export function getNonMutualFollowers(
  followers: string[],
  following: string[]
) {
  const unfollowers = getUnfollowers(followers, following);
  const nonMutual = followers.filter((username) => !following.includes(username));
  return { unfollowers, nonMutual };
}
