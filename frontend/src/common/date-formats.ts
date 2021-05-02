function getDateWithTimezone (date: string) {
  return new Date(date).setUTCDate(new Date().getTimezoneOffset());
}

export function getFormatedDate (date: string) {
  return new Date(getDateWithTimezone(date))
    .toLocaleString("en", { day: 'numeric', month: 'long'  });
}

export function getFormatedTime (date: string) {
  return new Date(getDateWithTimezone(date))
    .toLocaleString("en", { hour: 'numeric', minute: 'numeric' });
}
