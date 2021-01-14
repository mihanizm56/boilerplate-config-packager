export const initProcessListeners = () => {
  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    console.error('Application terminated with SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.error('Application terminated with SIGTERM');
    process.exit(0);
  });
};
