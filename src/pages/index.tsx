import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  Tr,
  Td,
  Th,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Text,
  Thead,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import {
  BsAlarm,
  BsBagHeart,
  BsBookHalf,
  BsFire,
  BsLightningFill,
  BsMoonStarsFill,
  BsRocket,
  BsUmbrella,
} from 'react-icons/bs';
import Draggable from 'react-draggable';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import formatCurrency from '@/utils/formatCurrency';
import Formulir, { Inputs } from '@/components/Formulir';
import { apiClient } from '@/store/api';
import { NextPageContext } from 'next';
import { NextPageWithLayout } from '@/utils/page';
import { TodosType } from '@/types/todos';
import { useAppToast } from '@/utils/useAppToast';

const Home = ({
  todos,
  itemDone,
}: {
  todos: TodosType[];
  itemDone: TodosType[];
}) => {
  const { successToast, errorToast, infoToast } = useAppToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const [dataTodo, setDataTodo] = useState<TodosType[]>(todos);
  const [doneTodo, setDoneTodo] = useState<TodosType[]>(itemDone);

  useEffect(() => {
    if (todos) {
      setDataTodo(todos);
    }

    if (itemDone) {
      setDoneTodo(itemDone);
    }
    return () => {};
  }, [todos, itemDone]);

  const [width, setWidth] = useState(300); // Initial width of the Box
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState({ x: 0, y: 0 });

  const [deadlineView, setDeadlineView] = useState<
    'PAYUNG' | 'ALARAM' | 'FIRE'
  >();

  console.log(doneTodo, 'todos');

  const [showButton, setShowButton] = useState(false);
  const controls = useAnimation(); // Framer Motion animation controls

  const handleDrag = (_e: any, ui: { deltaX: number }) => {
    // Update the width based on the drag position
    setWidth(width + ui.deltaX);

    // Start a smooth animation
    controls.start({ width: width });

    // You can add additional logic here if needed
  };

  const handleSetingDedline = (date: string) => {
    const now = new Date();
    const dateItem = new Date(date);
    const differenceInMonths = differenceInCalendarMonths(dateItem, now);
    const differenceInYears = differenceInCalendarYears(dateItem, now);

    let item;
    if (differenceInMonths < 5) {
      // setDeadlineView('FIRE');
      item = 'FIRE';
    } else if (differenceInMonths >= 5 && differenceInMonths <= 11) {
      // setDeadlineView('ALARAM');
      item = 'ALARAM';
    } else if (differenceInYears >= 1) {
      // setDeadlineView('PAYUNG');
      item = 'PAYUNG';
    } else {
      null;
    }

    return item;
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setTimeout(() => {
      setShowButton(true);
    }, 300);
  };

  const handleDragStop = () => {
    setPosition({ x: 112, y: 0 });
    setPositionOffset({ x: 15, y: 0 });
    setIsDragging(false);
  };

  const handleCancelDrag = () => {
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
  };

  const handleDeleteTodo = (id: number) => {
    setDataTodo((prev) => prev.filter((data) => data.id !== id));
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
    return apiClient
      .delete(`/api/todos-bismillah?id=${id}`)
      .then((res) => {
        successToast({
          description:
            'Doamu berhasil di hapus.., Semoga di ganti di alin waktu ya 😻',
        });

        return res.data?.data;
      })
      .catch(() => {
        errorToast({
          description: 'Terdapat kesalahan nih, cek lagi ya 👻',
        });
      });
  };

  const handleConfirmTodo = (id: number) => {
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
    return apiClient
      .patch(`/api/todos-bismillah?id=${id}`)
      .then((res) => {
        successToast({
          description: 'Selamat doamu tercapai.., Semangat terus ya 😻',
        });

        return res.data?.data;
      })
      .catch(() => {
        errorToast({
          description: 'Terdapat kesalahan nih, cek lagi ya 👻',
        });
      });
  };

  const handleTogleAccordion = () => {
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
  };

  return (
    <Container maxW="container.sm">
      <Heading p={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize={['xl', 'xl', '2xl', '2xl']}>
            Bismillah Project
          </Text>
          <IconButton
            aria-label="color-view"
            bg="transparent"
            fontWeight="bold"
            icon={
              <Icon
                as={colorMode === 'light' ? BsMoonStarsFill : BsLightningFill}
              />
            }
            onClick={toggleColorMode}
          />
          {/* <Button bg="transparent" onClick={toggleColorMode}>
            {colorMode === 'dark' ? <BsMoonStarsFill /> : <BsSunrise />}
          </Button> */}
        </Flex>
      </Heading>
      <Box mt={[2, 2, 5, 5]} p={2} rounded="md" shadow="2xl">
        <Tabs position="relative" variant="unstyled" isFitted>
          <TabList>
            <Tab
              rounded="md"
              display="flex"
              flexDir={['column', 'column', 'row', 'row']}
              fontSize={['sm', 'sm', 'md', 'md']}
              _selected={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
            >
              <Icon as={BsRocket} mr={[0, 0, 2, 2]} mb={[2, 2, 0, 0]} /> Daftar
              Bismillah
            </Tab>
            <Tab
              rounded="md"
              display="flex"
              flexDir={['column', 'column', 'row', 'row']}
              fontSize={['sm', 'sm', 'md', 'md']}
              _selected={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
            >
              <Icon as={BsBookHalf} mr={[0, 0, 2, 2]} mb={[2, 2, 0, 0]} />
              Tambahkan Doa
            </Tab>
            {/* <Tab
              rounded="md"
              display="flex"
              flexDir={['column', 'column', 'row', 'row']}
              fontSize={['sm', 'sm', 'md', 'md']}
              _selected={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
            >
              <Icon as={BsBagHeart} mr={[0, 0, 2, 2]} mb={[2, 2, 0, 0]} />
              Doa Terkabul
            </Tab> */}
          </TabList>
          <TabIndicator
            // bg={colorMode === 'dark' ? 'gray.200' : 'gray.200'}
            borderColor={colorMode === 'dark' ? 'white' : 'gray.500'}
            borderRadius="1px"
            px={5}
            borderBottom="2px"
          />
          <TabPanels>
            <TabPanel>
              <Accordion
                defaultIndex={[0]}
                allowToggle
                onChange={handleTogleAccordion}
              >
                {/* ALARAM = PERINGATAN */}
                {dataTodo.map((item) => {
                  const isViewDeadline = handleSetingDedline(item.deadline);
                  return (
                    <AccordionItem key={item.id}>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Flex alignItems="center">
                            <Tooltip
                              label={
                                isViewDeadline === 'ALARAM'
                                  ? 'Segera Banget'
                                  : isViewDeadline === 'FIRE'
                                  ? 'Harus Segera'
                                  : 'Di Tunggu Waktunya'
                              }
                              placement="top-end"
                              bg={
                                isViewDeadline === 'ALARAM'
                                  ? 'orange.200'
                                  : isViewDeadline === 'FIRE'
                                  ? 'red.200'
                                  : 'green.200'
                              }
                              color="black"
                            >
                              <IconButton
                                as={Box}
                                aria-label="status"
                                mr={3}
                                bg={
                                  isViewDeadline === 'ALARAM'
                                    ? 'orange.200'
                                    : isViewDeadline === 'FIRE'
                                    ? 'red.200'
                                    : 'green.200'
                                }
                                icon={
                                  <Icon
                                    as={
                                      isViewDeadline === 'ALARAM'
                                        ? BsAlarm
                                        : isViewDeadline === 'FIRE'
                                        ? BsFire
                                        : BsUmbrella
                                    }
                                    color={
                                      colorMode === 'dark'
                                        ? 'black'
                                        : 'gray.700'
                                    }
                                  />
                                }
                              />
                            </Tooltip>
                            <Text
                              fontWeight="bold"
                              fontSize={['sm', 'sm', 'md', 'md']}
                            >
                              {item.title}
                            </Text>
                          </Flex>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        {showButton && (
                          <Box
                            w={['34%', '22%', '20%', '20%']}
                            minH="40"
                            position="absolute"
                            zIndex={5}
                          >
                            <SimpleGrid columns={1} gap={2} color="black">
                              <Button
                                bg="red.300"
                                fontSize={['sm', 'sm', 'md', 'md']}
                                w="full"
                                h="14"
                                onClick={() => handleDeleteTodo(item.id)}
                              >
                                Hapus
                              </Button>
                              <Button
                                bg="green.300"
                                w="full"
                                fontSize={['sm', 'sm', 'md', 'md']}
                                h="14"
                                onClick={handleCancelDrag}
                              >
                                Kembali
                              </Button>
                              <Button
                                bg="green.500"
                                fontSize={['sm', 'sm', 'md', 'md']}
                                w="full"
                                h="14"
                                onClick={() => handleConfirmTodo(item.id)}
                              >
                                Selesai
                              </Button>
                            </SimpleGrid>
                          </Box>
                        )}
                        <Draggable
                          position={position}
                          positionOffset={positionOffset}
                          axis="x" // Enable horizontal dragging
                          onDrag={handleDrag}
                          onStart={handleDragStart}
                          onStop={handleDragStop}
                        >
                          <Box
                            bgGradient={
                              colorMode === 'light'
                                ? 'linear(to-r, white,rgba(255,255,255,0.3))'
                                : 'linear(to-r, gray.800,rgba(26,32,44,0.3))'
                            }
                            position="relative"
                            minH={['80', '80', '52', '52']}
                            overflowY="scroll"
                            zIndex={10}
                          >
                            <motion.div
                              style={{
                                width: isDragging ? `60%` : '50%',
                              }} // Animate the width
                              animate={controls}
                            >
                              <Box
                                minW="full"
                                onDoubleClick={() => setIsDragging(false)}
                                position="absolute"
                                zIndex={10}
                                fontSize={['sm', 'sm', 'md', 'md']}
                              >
                                <Text fontWeight="semibold">
                                  Deskripsi Kebutuhan :
                                </Text>
                                <Text>{item.description}</Text>
                                <SimpleGrid columns={2} pt={2}>
                                  <Text fontWeight="semibold">Biaya</Text>
                                  <Text>
                                    :{' '}
                                    {formatCurrency(
                                      Number.parseInt(item.budget)
                                    )}
                                  </Text>
                                  <Text fontWeight="semibold">
                                    Tanggal Kebutuhan
                                  </Text>
                                  <Text>
                                    :{' '}
                                    {new Date(
                                      item.deadline
                                    ).toLocaleDateString()}
                                  </Text>
                                </SimpleGrid>
                                <Box w="full" overflowX="scroll">
                                  <Flex
                                    justifyContent="flex-end"
                                    w="full"
                                    alignItems="end"
                                    gap={3}
                                    pt={3}
                                  >
                                    {item.tags.map((item, index) => {
                                      const itemTags = item;
                                      return (
                                        <Badge
                                          key={index}
                                          aria-label="NIKAH"
                                          colorScheme={itemTags.color}
                                          rounded="md"
                                          px={2}
                                        >
                                          {itemTags.label}
                                        </Badge>
                                      );
                                    })}
                                  </Flex>
                                </Box>
                              </Box>
                            </motion.div>
                          </Box>
                        </Draggable>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}

                {doneTodo?.length > 0 && (
                  <Box pt={5}>
                    <Text fontWeight="semibold" textAlign="center" mb={2}>
                      List Doa Yang Terkabul
                    </Text>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>No</Th>
                          <Th>Judul</Th>
                          <Th>Description</Th>
                          <Th>Tags</Th>
                        </Tr>
                      </Thead>
                      {doneTodo.map((item) => (
                        <Tbody key={item.id}>
                          <Tr>
                            <Td>{item.id}</Td>
                            <Td>{item.title}</Td>
                            <Td>{item.description}</Td>
                            <Td>
                              {item.tags.map((val) => (
                                <Flex key={val.label} gap={2}>
                                  <Badge bg={val.color}>{val.label}</Badge>
                                </Flex>
                              ))}
                            </Td>
                          </Tr>
                        </Tbody>
                      ))}
                    </Table>
                  </Box>
                )}
              </Accordion>
            </TabPanel>
            <TabPanel>
              <Formulir />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

Home.getInitialProps = async (_contex: NextPageContext) => {
  let todos = [] as TodosType[];
  let itemDone = [] as TodosType[];

  try {
    await apiClient
      .get('/api/todos-bismillah')
      .then((res) => {
        todos = res.data?.data;
        return res.data?.data;
      })
      .catch(() => {
        todos = [];
      });
    await apiClient
      .get('/api/todos-bismillah/done')
      .then((res) => {
        itemDone = res.data?.data;
        return res.data?.data;
      })
      .catch(() => {
        itemDone = [];
      });
  } catch (error) {
    todos = [];
    itemDone = [];
  }

  return {
    todos,
    itemDone,
  };
};

export default Home;
