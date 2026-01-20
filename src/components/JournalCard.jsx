import { libre } from "@/app/fonts/fonts";

const JournalCard = ({ title, description, action }) => {
  return (
    <div className="w-full group cursor-pointer pattern-bg" onClick={action}>
      <div className="p-4 min-h-56 bg-white bg-opacity-10 flex flex-col justify-between overlay">
        <div className="flex flex-col">
          <h4
            className={`font-bold text-lg leading-wide mb-4 pb-2 border-b border-white/20 ${libre.className}`}
          >
            {title}
          </h4>
          <textarea
            readOnly
            rows={7}
            value={description}
            className={`bg-transparent border-none outline-none resize-none text-sm line-clamp-6 w-full flex-1 cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
