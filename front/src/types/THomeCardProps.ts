import THeroResponse from "./THeroResponse";

type THomeCardProps = {
  className?: string;
  onClick?: () => void;
  hero: THeroResponse;
  changeStaus: (id: string, status: boolean) => void;
  deleteHero: (id: string) => void;
}
  
export default THomeCardProps;