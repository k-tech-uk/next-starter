// Components
import Header from '../components/header';
import Footer from '../components/footer';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
