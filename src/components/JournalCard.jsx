import { libre } from "@/app/fonts/fonts";

const JournalCard = ({ title, description, action }) => {
  return (
    <div className="w-full group cursor-pointer" onClick={action}>
      <div className="p-4 min-h-56 bg-white bg-opacity-10 flex flex-col justify-between justify-article-height">
        <div>
          <h4
            className={`font-bold text-lg leading-wide mb-4 pb-2 border-b border-white/20 ${libre.className}`}
          >
            {title}
          </h4>
          <p className={`text-sm line-clamp-6`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
