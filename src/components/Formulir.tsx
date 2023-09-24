import { apiClient } from '@/store/api';
import { useAppToast } from '@/utils/useAppToast';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BsCalendar, BsTag, BsTrash, BsTrash2 } from 'react-icons/bs';

const hideCalendarIcon = `
  ::-webkit-calendar-picker-indicator {
      background: none;
  }
`;

export type Inputs = {
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  tags?:
    | {
        label: string;
        color: string;
      }
    | {
        label: string;
        color: string;
      }[];
  status: string;
};

export default function Formulir() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const { successToast, errorToast, infoToast } = useAppToast();

  const [tagsItem, setTagsItem] = useState<{ label: string; color: string }[]>(
    []
  );

  const [errorCustom, setErrorCustom] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataSubmit: Partial<Inputs> = {
      title: data.title,
      description: data.description,
      status: data.status,
      budget: data.budget,
      deadline: data.deadline,
      tags: tagsItem,
    };

    if (tagsItem.length === 0) {
      setErrorCustom(true);
      return errorToast({
        description: 'Terdapat kesalahan nih, cek lagi ya 👻',
      });
    } else {
      return await apiClient
        .post('/api/todos-bismillah', dataSubmit)
        .then((response) => {
          successToast({
            description: 'Doamu berhasil di tambahkan.., Semoga Berhasil 😻',
          });
          return response.data;
        })
        .catch(() => {
          errorToast({
            description: 'Terdapat kesalahan nih, cek lagi ya 👻',
          });
        });
    }
  };

  const handleAddTags = () => {
    const newTags = getValues('tags') as {
      label: string;
      color: string;
    };

    if (!!newTags) {
      setTagsItem([
        ...tagsItem,
        { label: newTags?.label, color: newTags?.color },
      ]);
    }
  };

  const handleDeleteTag = (label: string) => {
    setTagsItem((tags) => tags.filter((v) => v.label !== label));
  };

  useEffect(() => {
    const handleTimeoutInfo = setTimeout(() => {
      infoToast({
        description: 'Pelan-pelan pak sopir',
      });
    }, 200);

    return () => {
      clearTimeout(handleTimeoutInfo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Input
            hidden
            fontSize={['sm', 'sm', 'md', 'md']}
            defaultValue="create"
            {...register('status', { required: true })}
          />
          <Box my={2}>
            <FormLabel
              fontSize={['sm', 'sm', 'md', 'md']}
              fontWeight="semibold"
            >
              Judul
            </FormLabel>
            <Input
              fontSize={['sm', 'sm', 'md', 'md']}
              {...register('title', { required: true })}
            />
            {errors.title && (
              <Text fontSize="x-small" color="red" pt={2}>
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
              minH="40"
              fontSize={['sm', 'sm', 'md', 'md']}
              {...register('description', { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.description && (
              <Text fontSize="x-small" color="red" pt={2}>
                Deksripsi ini di tujukan untuk memperjelas maksud dari Judul di
                atas
              </Text>
            )}
          </Box>
          <Box my={2}>
            <FormLabel
              fontSize={['sm', 'sm', 'md', 'md']}
              fontWeight="semibold"
            >
              Total Budget
            </FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.400">RP</InputLeftElement>
              <Input
                type="number"
                fontSize={['sm', 'sm', 'md', 'md']}
                {...register('budget', { required: true })}
              />
            </InputGroup>
            {/* errors will return when field validation fails  */}
            {errors.budget && (
              <Text fontSize="x-small" color="red" pt={2}>
                Deksripsi ini di tujukan untuk memperjelas maksud dari Judul di
                atas
              </Text>
            )}
          </Box>
          <Box my={2}>
            <FormLabel
              fontSize={['sm', 'sm', 'md', 'md']}
              fontWeight="semibold"
            >
              Deadline
            </FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.400">
                <Icon as={BsCalendar} />
              </InputLeftElement>
              <Input
                type="date"
                fontSize={['sm', 'sm', 'md', 'md']}
                {...register('deadline', { required: true })}
                css={hideCalendarIcon}
              />
            </InputGroup>
            {/* errors will return when field validation fails  */}
            {errors.deadline && (
              <Text fontSize="x-small" color="red" pt={2}>
                Deksripsi ini di tujukan untuk memperjelas maksud dari Judul di
                atas
              </Text>
            )}
          </Box>
          <Box my={2}>
            <FormLabel
              fontSize={['sm', 'sm', 'md', 'md']}
              fontWeight="semibold"
            >
              Tags
            </FormLabel>
            <InputGroup
              display="flex"
              flexDir={['column', 'column', 'row', 'row']}
            >
              <Input
                placeholder="tags"
                rounded="none"
                type="string"
                fontSize={['sm', 'sm', 'md', 'md']}
                {...register('tags.label')}
              />
              <Select
                // placeholder="pilih warna tag"
                rounded="none"
                fontSize={['sm', 'sm', 'md', 'md']}
                {...register('tags.color')}
              >
                <option value="red" style={{ color: 'red' }}>
                  Merah
                </option>
                <option value="blue">Biru</option>
                <option value="green">Hijau</option>
                <option value="orange">Orange</option>
              </Select>
              <InputRightAddon
                alignItems="center"
                justifyContent="center"
                color="gray.400"
                onClick={() => {
                  handleAddTags();
                }}
                _hover={{ cursor: 'pointer' }}
              >
                <Icon as={BsTag} mr={2} />
                Tambah Tag
              </InputRightAddon>
            </InputGroup>
            {/* errors will return when field validation fails  */}
            {errors.tags && (
              <Text fontSize="x-small" color="red" pt={2}>
                Deksripsi ini di tujukan untuk memperjelas maksud dari Judul di
                atas
              </Text>
            )}
          </Box>

          {tagsItem.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minH="20"
              shadow="xl"
              fontSize="sm"
              color={errorCustom ? 'red' : ''}
              fontWeight="bold"
            >
              {errorCustom
                ? 'List Tags Akan Belum di Tambahkan'
                : 'List Tags Akan Muncul disini Setelah di Tambahkan'}
            </Box>
          ) : (
            <Table size="sm" shadow="md">
              <Thead>
                <Tr flex="1" w="full">
                  <Th w="full" maxW="40%">
                    Label
                  </Th>
                  <Th w="full">Color</Th>
                  <Th w="full" textAlign="left">
                    Action
                  </Th>
                </Tr>
              </Thead>
              {tagsItem.map((item, index) => (
                <Tbody key={index}>
                  <Tr>
                    <Td>{item.label}</Td>
                    <Td>{item.color}</Td>
                    <Td>
                      <Flex
                        w="full"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          onClick={() => handleDeleteTag(item.label)}
                          aria-label="deleteitem"
                          bg="gray.500"
                          icon={<Icon as={BsTrash} />}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
          )}
        </Flex>

        <Button onClick={handleSubmit(onSubmit)} type="submit" mt={4}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
