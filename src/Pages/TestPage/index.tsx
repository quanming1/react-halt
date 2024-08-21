import styles from "./index.module.scss";
// import viewer from "../../../public/pdfjs/viewer.html";

// console.log("viewer", viewer);
const url =
  "http://120.53.86.159:39000/keyun/6af0cd27136578e29bdce2597e2351d2183160ec55e55c67cefa20d86fe3221b.pdf";
export default function TestPage() {
  return (
    <div className={styles["test-page-container"]}>
      <iframe
        style={{
          width: "100%",
          height: "100%",
        }}
        src={url}
      />
    </div>
  );
}
