const Star = ({ filled, partial }) => {
  const fullStar =
    "M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";
  const emptyStar =
    "M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";
  const partialStar =
    "M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={` w-4 h-4 ${filled ? "text-yellow-300" : "text-gray-300"}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={filled ? fullStar : emptyStar} />
      {partial && (
        <path
          d={partialStar}
          clipRule="evenodd"
          fillRule="evenodd"
          className="text-yellow-300"
          style={{ clipPath: `inset(0 ${100 - partial}% 0 0)` }}
        />
      )}
    </svg>
  );
};

// Main RatingStars component
const RatingStars = ({ rating, totalRatings, totalStars = 5 }) => {
  const stars = Array(totalStars).fill(0);
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {stars.map((_, index) => {
          const isFull = index < fullStars;
          const isPartial = index === fullStars && partialStar > 0;
          return (
            <Star
              key={index}
              filled={isFull}
              partial={isPartial ? partialStar * 100 : 0}
            />
          );
        })}
      </div>
      <p className="text-[14px] pt-0.5 m-0">{rating}</p>
      <p className="text-[14px] pt-0.5 m-0 text-gray-400">({totalRatings})</p>
    </div>
  );
};

export default RatingStars;
