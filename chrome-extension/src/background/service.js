// service.js

console.log("[Trust Checker] 백그라운드 스크립트 로드됨");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📡 수신된 메시지:", message);

  if (message.action === "SEND_TEXT_DATA") {
    fetch("http://localhost:3000/api/analysis/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: message.data }),
    })
      .then((res) => res.json())
      .then((textDataResult) => {
        console.log("✅ 텍스트 데이터 응답:", textDataResult);

        // 여기서 바로 analyze API 호출
        return fetch("http://localhost:3000/api/analysis/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // 필요하면 textDataResult에서 필요한 값 넘겨주기
            videoId: message.videoId,
            youtubeText: message.data, // or textDataResult.something
          }),
        });
      })
      .then((res) => res.json())
      .then((analyzeResult) => {
        console.log("📊 전체 분석 결과:", analyzeResult);
        sendResponse({ status: "success", analyzeResult });
      })
      .catch((error) => {
        console.error("데이터 처리 실패:", error);
        sendResponse({ status: "error", error });
      });

    return true;
  }

  if (message.action === "REQUEST_FULL_ANALYSIS") {
    fetch("http://localhost:3000/api/analysis/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId: message.videoId,
        youtubeText: message.youtubeText,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // HTTP status가 200~299가 아니면 에러로 처리
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((analyzeResult) => {
        console.log("📊 전체 분석 결과:", analyzeResult);
        sendResponse({ status: "success", analyzeResult });
      })
      .catch((error) => {
        console.error("데이터 처리 실패:", error);
        sendResponse({ status: "error", error: error.message });
      });
    return true;
  }
});
