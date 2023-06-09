import { Link, Skeleton, Text } from '@chakra-ui/react';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';
import ErrorFragment from '../ErrorFragment';
import AppRouteLink from '../../../../../../components/ui/AppLink';

const UserMention = ({ user, isPreview }: { user: Id; isPreview?: boolean }) => {
  const { data, isLoading, isError } = apiSlice.useGetUserQuery({ user });

  if (isError) {
    return <ErrorFragment>@[user not found]</ErrorFragment>;
  }

  if (isLoading) {
    return (
      <Skeleton as="span" noOfLines={1}>
        @username
      </Skeleton>
    );
  }

  if (isPreview) {
    return <Text>@{data?.alias}</Text>;
  }

  return (
    <Link as={AppRouteLink} color="message-link" to={`/${data?.alias}`}>
      @{data?.alias}
    </Link>
  );
};

export default UserMention;
