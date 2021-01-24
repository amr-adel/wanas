export default function Icon({ name, box }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${box} w-${box} mx-auto`}
    >
      <use href={`static/images/icons.svg#${name}`} />
    </svg>
  );
}
