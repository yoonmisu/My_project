function showEvent(cardId, eventType) {
    let card = document.getElementById(cardId);
    if (!card) return;
  
    let contentHTML = "";
    let alertMsg = "";
  
    if (eventType === 2) {
      alertMsg = "🎟️ 예매 인증 이벤트\n\n\"예매 연습 페이지 오픈 기념\"\n예매 연습을 인증한 모두에게 작은 간식을 드려요!";
      contentHTML = `
        <div class="event-content">
          <h4>예매 인증 이벤트</h4>
          <p>‼️예매 연습 페이지 오픈 기념‼️<br>예매 연습 인증하고<strong> 간식 받아가기!</strong></p>
        </div>
      `;
    } else if (eventType === 1) {
      alertMsg = "🏆 랭킹 도전 이벤트\n\n\"포도알 잡기 게임\" 최고 기록을 갱신하면\n개발자가 매점 쏩니다!";
      contentHTML = `
        <div class="event-content">
          <h4>랭킹 도전 이벤트</h4>
          <p>"포도알 잡기 게임" 최고 기록 깨면<br><strong>개발자가 매점 쏨!</strong></p>
        </div>
      `;
    }
  
    alert(alertMsg);
    card.innerHTML = contentHTML;
  }
  