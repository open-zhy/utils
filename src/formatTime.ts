import { format, formatDistanceToNow } from 'date-fns';

declare type DateType = string | number | Date;

export function fDate(date: DateType) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: DateType) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date: DateType) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: DateType) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
