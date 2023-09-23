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
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import {
  BsAlarm,
  BsBookHalf,
  BsFire,
  BsMoonStarsFill,
  BsRocket,
  BsSunrise,
  BsUmbrella,
} from 'react-icons/bs';
import Draggable from 'react-draggable';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import {
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import formatCurrency from '@/utils/formatCurrency';

interface DataTypeTodo {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  tags: string[];
}

const intialData: DataTypeTodo[] = [
  {
    id: '112scvawe',
    title: 'Beli Emas',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum reprehenderit quos, maxime voluptatibus officia tempora perferendis blanditiis officiis provident culpa molestiae ipsum explicabo harum porro quibusdam cumque eaque quis fuga.',
    budget: 20000000,
    deadline: '12-12-2024',
    tags: [`{"label":"nikah", "color":"red"}`],
  },
  {
    id: 'asdf2312ed',
    title: 'Liburan',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum reprehenderit quos, maxime voluptatibus officia tempora perferendis blanditiis officiis provident culpa molestiae ipsum explicabo harum porro quibusdam cumque eaque quis fuga.',
    budget: 10950000,
    deadline: '9-12-2023',
    tags: [`{"label":"holiday", "color":"blue"}`],
  },
  {
    id: 'aadf23145523',
    title: 'Bangun Rumah',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum reprehenderit quos, maxime voluptatibus officia tempora perferendis blanditiis officiis provident culpa molestiae ipsum explicabo harum porro quibusdam cumque eaque quis fuga.',
    budget: 200000000,
    deadline: '10-12-2022',
    tags: [`{"label":"urip", "color":"orange"}`],
  },
];

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [dataTodo, setDataTodo] = useState<DataTypeTodo[]>(intialData);
  const [width, setWidth] = useState(300); // Initial width of the Box
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState({ x: 0, y: 0 });

  const [deadlineView, setDeadlineView] = useState<
    'PAYUNG' | 'ALARAM' | 'FIRE'
  >();

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
    setPosition({ x: 120, y: 0 });
    setPositionOffset({ x: 10, y: 0 });
    setIsDragging(false);
  };

  const handleCancelDrag = () => {
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
  };

  const handleDeleteTodo = (id: string) => {
    setDataTodo((prev) => prev.filter((data) => data.id !== id));
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
  };

  const handleConfirmTodo = (id: string) => {
    setPosition({ x: 0, y: 0 });
    setPositionOffset({ x: 0, y: 0 });
    setShowButton(false);
  };

  return (
    <Container maxW="container.sm">
      <Heading p={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="2xl">
            Bismillah Project
          </Text>
          <Button bg="transparent" onClick={toggleColorMode}>
            {colorMode === 'dark' ? <BsMoonStarsFill /> : <BsSunrise />}
          </Button>
        </Flex>
      </Heading>
      <Box mt={5} p={2} rounded="md" shadow="2xl">
        <Tabs position="relative" variant="unstyled" isFitted>
          <TabList>
            <Tab
              rounded="md"
              _selected={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
            >
              <Icon as={BsRocket} mr={2} /> Daftar Bismillah
            </Tab>
            <Tab
              rounded="md"
              _selected={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
            >
              <Icon as={BsBookHalf} mr={2} />
              Tambahkan Doa
            </Tab>
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
              <Accordion defaultIndex={[0]} allowToggle>
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
                            <Text fontSize="md" fontWeight="bold">
                              {item.title}
                            </Text>
                          </Flex>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        {showButton && (
                          <Box
                            w={['25%', '22%', '20%', '20%']}
                            minH="40"
                            position="absolute"
                            zIndex={5}
                          >
                            <SimpleGrid columns={1} gap={2} color="black">
                              <Button
                                bg="red.300"
                                w="full"
                                h="14"
                                onClick={() => handleDeleteTodo(item.id)}
                              >
                                Hapus
                              </Button>
                              <Button
                                bg="green.300"
                                w="full"
                                h="14"
                                onClick={handleCancelDrag}
                              >
                                Kembali
                              </Button>
                              <Button
                                bg="green.500"
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
                            position="relative"
                            minH="52"
                            minW={isDragging ? '60%' : '100%'}
                            overflowY="scroll"
                          >
                            <motion.div
                              style={{ width: isDragging ? `60%` : '100%' }} // Animate the width
                              animate={controls}
                            >
                              <Box
                                minW="full"
                                onDoubleClick={() => setIsDragging(false)}
                                position="absolute"
                                zIndex={2}
                              >
                                <Text fontWeight="semibold">
                                  Deskripsi Kebutuhan :
                                </Text>
                                <Text>{item.description}</Text>
                                <SimpleGrid columns={2} pt={2}>
                                  <Text fontWeight="semibold">Biaya</Text>
                                  <Text>: {formatCurrency(item.budget)}</Text>
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
                                      const itemTags = JSON.parse(item);
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
              </Accordion>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
