import Link from "next/link";

const Question = () => {
  return (
    <section
      className="tf__question pt_100 xs_pt_70 pb_100 xs_pb_70"
      data-animation=""
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link
              href="contact"
              data-cursor='<i class="fa-light fa-envelope"></i>'
              className="tf__question_text"
            >
              <h2>
                Have any <span>project?</span>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Question;
