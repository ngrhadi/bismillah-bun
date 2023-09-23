import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  judul: string;
  deskripsi: string;
};

export default function Formulir() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Box w="full">
      <FormControl
        display="flex"
        flexDir="column"
        w="full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex flexDir="column">
          {/* register your input into the hook by invoking the "register" function */}
          <Box my={2}>
            <FormLabel
              fontSize={['sm', 'sm', 'md', 'md']}
              fontWeight="semibold"
            >
              Judul
            </FormLabel>
            <Input
              fontSize={['sm', 'sm', 'md', 'md']}
              {...register('judul', { required: true })}
            />
            {errors.deskripsi && (
              <Text fontSize="x-small" color="red">
                Judul sangat dibutuhkan agar tidak plagiat dengan lagu Iwan Fals
                Tidak Ada Judul
              </Text>
            )}
            {/* include validation with required or other standard HTML validation rules */}
          </Box>
          <Box my={2}>
            <FormLabel
              fontSize={['sm', 'sm', 'md', 'md']}
              fontWeight="semibold"
            >
              Deskripsi
            </FormLabel>
            <Textarea
              fontSize={['sm', 'sm', 'md', 'md']}
              {...register('deskripsi', { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.deskripsi && (
              <Text fontSize="x-small" color="red">
                Deksripsi ini di tujukan untuk memperjelas maksud dari Judul di
                atas
              </Text>
            )}
          </Box>
        </Flex>

        <Button type="submit">Submit</Button>
      </FormControl>
    </Box>
  );
}
