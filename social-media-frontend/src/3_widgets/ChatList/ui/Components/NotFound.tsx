import { useTranslation } from "react-i18next";

import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

interface NotFoundProps {
  text: string
}

const NotFound = ({ text } : NotFoundProps) => {
  const { t } = useTranslation();
  return (
    <VStack align="center" max>
      <Text text={text} />
    </VStack>
  );
};

export default NotFound;
