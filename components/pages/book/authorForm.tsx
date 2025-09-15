import { XStack, YStack, Text } from "tamagui";
import Button from "@/theme-config/custom-components";
import { useState } from "react";
import NewAuthorModal from "@/components/ui/authorModal";
import { useForm } from "react-hook-form";
import { useCreateAuthor } from "@/hooks/useAuthorPage";
import { Author, NewAuthor } from "@/models/author.model";
import AuthorDialog from "@/components/ui/authorDialog";

type FormValues = {
  authorName: string;
};

type AuthorFormProps = {
  author: Author | null;
  setAuthor: (author: Author | null) => void;
};

const AuthorForm = ({ author, setAuthor }: AuthorFormProps) => {
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showAuthorDialog, setShowAuthorDialog] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { authorName: author?.name ?? "" },
  });

  const createAuthorMutation = useCreateAuthor();

  const onSubmitAuthor = (data: FormValues) => {
    if (author && author.name === data.authorName) return;

    const newAuthor: NewAuthor = { name: data.authorName };

    createAuthorMutation.mutate(newAuthor, {
      onSuccess: (savedAuthor) => {
        setAuthor(savedAuthor);
        reset({ authorName: "" });
        setShowAuthorDialog(false);
      },
    });
  };

  return (
    <YStack gap={20}>
      <XStack gap={20}>
        <XStack alignItems="center">
          <Text fontWeight="700">Author </Text>
          <Text fontSize={12} color="#a70117a4">
            *
          </Text>
        </XStack>
        <YStack
          borderWidth={1}
          borderColor={author ? "#2E3B76" : "#ccc"}
          paddingHorizontal={10}
          paddingVertical={12}
          borderRadius={5}
          flex={1}
          justifyContent="center"
        >
          <Text color={author ? "#000" : "#999"}>
            {author?.name ?? "Set an author"}
          </Text>
        </YStack>
      </XStack>

      <XStack gap={10} paddingHorizontal={20} jc="space-between" ai="center">
        <Button
          onPress={() => setShowAuthorDialog(true)}
          backgroundColor="green"
        >
          New author
        </Button>
        <Button onPress={() => setShowAuthorModal(true)} backgroundColor="red">
          Select from list
        </Button>
        {author && (
          <Button
            backgroundColor="#666" 
            onPress={() => setAuthor(null)}
          >
            Clear
          </Button>
        )}
      </XStack>
      {showAuthorDialog && (
        <AuthorDialog
          visible={showAuthorDialog}
          onCancel={() => setShowAuthorDialog(false)}
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmitAuthor)}
        />
      )}
      {showAuthorModal && (
        <NewAuthorModal
          visible={showAuthorModal}
          onCancel={() => setShowAuthorModal(false)}
          author={author}
          setAuthor={setAuthor}
        />
      )}
    </YStack>
  );
};

export default AuthorForm;
