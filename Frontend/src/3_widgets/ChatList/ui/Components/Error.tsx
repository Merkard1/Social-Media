import { useTranslation } from "react-i18next";

import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

interface ErrorProps {
}

const Error = (props : ErrorProps) => {
  const { t } = useTranslation();
  return (
    <VStack align="center" max>
      <Text
        text={t("Please refresh the page")}
        title={t("Something went wrong")}
        variant="error"
      />
    </VStack>
  );
};

export default Error;
