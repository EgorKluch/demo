import config from "../config";
import moment from 'moment';

const dbDate = (date?: number) => moment(date).format(config.dbDateFormat);

export default dbDate;
