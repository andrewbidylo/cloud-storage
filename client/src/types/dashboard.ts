export interface Dashboard<P = {}> extends React.FC<P> {
  getLayout: (page: React.ReactElement) => React.ReactNode;
}