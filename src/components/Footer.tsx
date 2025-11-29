export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer site-footer--slim">
      <div className="container-1120 text-center">
        <p className="text-white font-bold" style={{ fontSize: '1em' }}>
          &copy; {currentYear} Gallena Medical Centre. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
