export default function Icon({ name, classes }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={classes}>
      <use href={`static/images/icons.svg#${name}`} />
    </svg>
  );
}
