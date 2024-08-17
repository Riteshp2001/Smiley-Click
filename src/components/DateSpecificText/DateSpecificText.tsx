/* eslint-disable */
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';

interface Props {
  content: React.ReactNode;
  altContent: React.ReactNode;
  predicate: (dateFns: {
    isBefore: typeof isBefore;
    isAfter: typeof isAfter;
  }) => boolean;
}

export default function DateSpecificText({
  content,
  altContent,
  predicate,
}: Props) {
  return predicate({ isBefore, isAfter }) ? content : altContent;
}
