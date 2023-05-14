import { Card, CardBody, CardHeader, HStack, Spacer, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import MessageTime from './MessageTime';
import MessageBody from './body/MessageBody';
import { apiSlice } from '../../../../store/apiSlice';
import { Message } from '../../../../store/models';
import { FailedMessage } from '../../../../store/actions';
import MessageAuthor from './MessageAuthor';

const isFailed = (message: Message | FailedMessage): message is FailedMessage =>
  !('author' in message);

const MessageItem = ({ message }: { message: Message | FailedMessage }) => {
  const headerColor = useColorModeValue('gray.800', 'gray.200');
  const messagesColor = useColorModeValue('gray.50', 'gray.700');
  const myMessagesColor = useColorModeValue('teal.100', 'teal.800');
  const { data } = apiSlice.useGetCurrentUserQuery();
  const [getUser, { data: authorData }] = apiSlice.useLazyGetUserQuery();

  useEffect(() => {
    if (isFailed(message)) {
      return;
    }
    getUser({ user: message.author });
  }, [data, getUser, message]);

  return (
    <Card
      padding={2}
      background={
        !('author' in message) || message.author === data?.id ? myMessagesColor : messagesColor
      }
      maxWidth={['xs', 'sm', null, 'md', 'lg']}
    >
      <CardHeader padding={0} fontSize="sm" color={headerColor}>
        <HStack>
          <MessageAuthor author={authorData ?? data} />
          <Spacer />
          <MessageTime
            created_at={new Date(message.created_at)}
            updated_at={isFailed(message) ? undefined : new Date(message.updated_at)}
            isFailed={isFailed(message)}
          />
        </HStack>
      </CardHeader>
      <CardBody padding={0}>
        <MessageBody body={message.body} />
      </CardBody>
    </Card>
  );
};

export default MessageItem;
