import { Container } from "@/components/container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
          <div className="flex order-2 md:order-1  gap-2 font-normal text-2sm">
            <span className="text-gray-500">{currentYear} &copy;</span>
            <a
              href="https://smartinb.com"
              target="_blank"
              className="text-gray-600 hover:text-primary"
            >
              Smartinb Solutions
            </a>
          </div>
          <nav className="flex order-1 md:order-2 gap-4 font-normal text-2sm text-gray-600">
            <a
              href="https://wa.me/905300606202"
              target="_blank"
              className="hover:text-primary"
            >
              Support
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
