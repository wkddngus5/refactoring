1. VSCode refactoring(shift + option + R), rename Symbol기능
2. 지역변수 제거, 반복문 쪼개기: 추출 작업이 쉬워진다. 루프를 돌더라도 성능에 큰 영향이 없다.
 - 성능문제: "특별한 경우가 아니라면 일단 무시하라": 특별한 경우란? array size 기준?
3. playFor 함수: 순수하지 않다. palys를 파라미터로 받지 않지만 내부에서 사용한다.

