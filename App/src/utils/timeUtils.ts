// 시간 계산 함수(한국은 UTC+9)
export const calculateTimeWrittenAgo = (dateOfWriting: string) => {
  //현재 시간을 UTC+9로 변환
  const now = new Date();
  const offset = 9 * 60 * 60 * 1000; //9 hours in milliseconds
  const nowUtcPlus9 = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
                          now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()) + offset;

  // dateOfWriting을 Date 객체로 변환하고, UTC+9로 변환
  const postDate = new Date(dateOfWriting);
  const postDateUtcPlus9 = Date.UTC(postDate.getUTCFullYear(), postDate.getUTCMonth(), postDate.getUTCDate(), 
                                postDate.getUTCHours(), postDate.getUTCMinutes(), postDate.getUTCSeconds()) + offset;

  const difference = nowUtcPlus9 - postDateUtcPlus9;

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return '방금 전';
  }
};