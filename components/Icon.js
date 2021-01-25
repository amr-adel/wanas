export default function Icon({ name, box, classes = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${box} w-${box} ${classes}`}
    >
      <use href={`static/images/icons.svg#${name}`} />
    </svg>
  );
}
