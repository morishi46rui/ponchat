import controller from 'api/tasks/controller';
import { fail } from 'assert';
import { exec } from 'child_process';
import fastify from 'fastify';
import { promisify } from 'util';
import { beforeEach, expect, test } from 'vitest';

beforeEach(async () => {
  await promisify(exec)('npx prisma migrate reset --force');
});

test('dependency injection into controller', async () => {
  let printedMessage = '';

  const injectedController = controller.inject((deps) => ({
    getTasks: deps.getTasks.inject({
      prisma: {
        task: {
          findMany: () =>
            Promise.resolve([
              { id: 0, label: 'task1', done: false },
              { id: 1, label: 'task2', done: false },
              { id: 2, label: 'task3', done: true },
              { id: 3, label: 'task4', done: true },
              { id: 4, label: 'task5', done: false },
            ]),
        },
      },
    }),
    print: (text: string) => {
      printedMessage = text;
    },
  }))(fastify());

  const limit = 3;
  const message = 'test message';
  const res = await injectedController.get({ query: { limit, message } });

  if (res.status !== 200) fail('Response must be successful');

  expect(res.body).toHaveLength(limit);
  expect(printedMessage).toBe(message);
});
