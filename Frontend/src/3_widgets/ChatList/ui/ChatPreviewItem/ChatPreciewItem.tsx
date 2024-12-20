import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Card } from "@/6_shared/ui/Card/Card";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

interface ChatPreviewItemProps {
 className?: string
}

export const ChatPreviewItem = ({ className } : ChatPreviewItemProps) => (
  <Card max variant="light">
    <HStack gap="8">
      <Avatar src="" size={50} />
      <VStack gap="4" max>
        <HStack justify="between" max>
          <Text text="Username" bold />
          <Text text="08:43" />
        </HStack>
        <Text text="message" />
      </VStack>
    </HStack>
  </Card>
);
