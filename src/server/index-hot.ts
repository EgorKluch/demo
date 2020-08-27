import renderer from './renderer';

export default ({ clientStats }: any) => renderer({ clientStats, hot: true });