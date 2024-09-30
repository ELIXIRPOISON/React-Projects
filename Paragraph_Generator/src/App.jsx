import React, { useState } from "react";
import "./index.css";

const data = [
  `1) Life is a journey, not a destination. It is filled with moments of joy, sorrow, learning, and growth. Every step we take, whether forward or backward, is part of the path we are meant to walk.`,
  `2) Happiness is found not in things or places, but in moments and relationships. Cherish the people who matter, embrace the experiences that shape you, and learn to let go of what no longer serves you.`,
  `3) Challenges are lifes way of teaching us resilience. Every obstacle is an opportunity in disguise. With each challenge we face, we grow stronger, wiser, and more equipped to handle the next.`,
  `4) Success is not measured by wealth or status, but by how much we have loved and how much we have grown. It is about living authentically, staying true to our values, and positively impacting the lives of others.`,
  `5) Time is the most valuable resource we have. Spend it wisely, not only on pursuits that bring you success, but also on moments that bring joy and peace. Life is fleeting, and it is the simple moments that often leave the deepest impact.`,
  `6) Gratitude is the secret to a fulfilled life. When we appreciate what we have, instead of longing for what we do not, we open ourselves up to true contentment. There is always something to be grateful for, even in the hardest times.`,
  `7) Life is a balance of holding on and letting go. There are moments when we need to persist, and others when we need to surrender. The key is knowing when to do each, and trusting that life will unfold as it should.`,
  `8) Love is the essence of life. It is what connects us to others, brings meaning to our existence, and inspires us to be better. Whether in friendships, family, or romance, love enriches our lives in ways nothing else can.`,
  `9) Growth happens when we step out of our comfort zone. Life begins at the edge of our fears and uncertainties. Embrace change, take risks, and never stop striving to become the best version of yourself.`,
];

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
      alert("Oops! You know that you wrote a negative input 😵");
    }
    if (count > 9) {
      amount = 9;
      alert(
        "Ooops! You are demanding very much paragraphs in one go, kindly take a little bit 😀"
      );
    }
    setText(data.slice(0, amount));
  };

  return (
    <section className="section-center">
      <h3>Want to know about life?</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className="btn">Generate</button>
      </form>
      <article className="lorem-text">
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
