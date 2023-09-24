import { useToast, UseToastOptions } from '@chakra-ui/react';

export const baseInfoToastOptions: UseToastOptions = {
  status: 'info',
  duration: 3000,
  isClosable: true,
  position: 'top-left',
  title: 'Info',
};

export const baseSuccessToastOptions: UseToastOptions = {
  status: 'success',
  duration: 3000,
  isClosable: true,
  position: 'top-left',
  title: 'Success',
};

export const baseErrorToastOptions: UseToastOptions = {
  status: 'error',
  duration: 8000,
  isClosable: true,
  position: 'top-left',
  title: 'Error',
};

export const baseGeneralToastOptions: UseToastOptions = {
  duration: 8000,
  isClosable: true,
  position: 'top-left',
};

export const useAppToast = () => {
  const toast = useToast();

  const infoToast = (options: UseToastOptions) => {
    toast({
      ...baseInfoToastOptions,
      ...options,
    });
  };

  const successToast = (options: UseToastOptions) => {
    toast({
      ...baseSuccessToastOptions,
      ...options,
    });
  };

  const errorToast = (options: UseToastOptions) => {
    toast({
      ...baseErrorToastOptions,
      ...options,
    });
  };

  const generalToast = (options: UseToastOptions) => {
    if (options.status === undefined) {
      console.error('Status option for generalToast is mandatory');
    } else {
      toast({
        ...baseGeneralToastOptions,
        ...options,
      });
    }
  };

  return { errorToast, successToast, generalToast, infoToast, toast };
};
