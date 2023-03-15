import ButtonAddFeedback from "../button/ButtonAddFeedback";

const NoInvoice = () => {
  return (
    <div className="noInvoice-container border-radius flex flex__alignCenter flex__column flex__justifyCenter">
      <img src="./assets/shared/icon-empty.svg" alt="icon empty" />
      <section>
        <h1>There is no feedback yet.</h1>
        <p className="body2">
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <ButtonAddFeedback />
      </section>
    </div>
  );
};

export default NoInvoice;
