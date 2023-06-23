interface ShorterProps {
  responseData: string;
}

function Shorter({ responseData }: ShorterProps) {
  return (
    <div className="text-start m-3 p-3 border border-white w-50">
      <p className=" h4">
        Shortened URL:{" "}
        <a
          href={responseData}
          className="text-decoration-none h6 text-primary "
          target="_blank"
          rel="noopener noreferrer"
        >
          {responseData}
        </a>
      </p>
    </div>
  );
}

export default Shorter;
