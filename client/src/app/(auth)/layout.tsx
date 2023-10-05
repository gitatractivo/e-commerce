
import NavBar from '@/components/NavBar';
import Text from '@/components/ui/Text';
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
}

const layout = ({children}: Props) => {
    
  return (
    <div className="h-screen">
      <NavBar className="flex gap-3">
        <Text variant="titleSm" className="flex flex-1 items-center ">
          <Link href="/">
            {/* <LeftArrow /> */}
            {"<-"}
            Back to store
          </Link>
        </Text>
        <div>Logo</div>
      </NavBar>

      <div className="pt-22 h-full">{children}</div>
    </div>
  );
}

export default layout