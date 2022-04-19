const Footer = (): JSX.Element => (
  <footer className="text-gray-600">
    <div className="bg-gray-200 py-10 px-5">
      <div className="container">
        <div className="flex justify-between">
          <div>
            <h4 className="text-2xl text-brand-blue-900 pb-4 font-bold">Discover more</h4>
            <p>Other navigation items here</p>
          </div>
          <div>
            <h4 className="text-2xl text-brand-blue-900 pb-4 font-bold">Connect with us</h4>
            <p>Maybe some social links here</p>
          </div>
          <div>
            <h4 className="text-2xl text-brand-blue-900 pb-4 font-bold">Contact us</h4>
            <address className="not-italic">
              <span className="block mb-3">Super company name</span>
              123 Fake Street
              <br />
              Fakesville
              <br />
              FA45 123
              <br />
              <a href="mailto:test@testington.com" target="_blank" rel="noopener noreferrer" className="block mt-3">
                test@testington.com
              </a>
            </address>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center py-5">
      <p className="text-sm text-gray-400">&copy; My Epic Company {new Date().getFullYear()}. Read our </p>
    </div>
  </footer>
);

export default Footer;
