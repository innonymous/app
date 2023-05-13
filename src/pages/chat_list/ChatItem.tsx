import {
  Box,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Chat } from '../../store/models';
import DateTime from '../../components/ui/DateTime';
import AppRouteLink from '../../components/ui/AppLink';

const ChatItem = ({ chat }: { chat: Chat }) => {
  const hoverColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <LinkBox _hover={{ background: hoverColor }} width="0" minWidth="100%">
      <LinkOverlay as={AppRouteLink} to={chat.alias}>
        <Box padding="3">
          <HStack>
            <Text noOfLines={1}>{chat.name}</Text>
            <Text minWidth="fit-content" color="gray">
              {chat.alias}
            </Text>
            <Spacer />
            <Text minWidth="fit-content">
              <DateTime time={new Date(chat.updated_at)} format="chat_time" />
            </Text>
          </HStack>
          <Text noOfLines={1}>{chat.about}</Text>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ChatItem;
