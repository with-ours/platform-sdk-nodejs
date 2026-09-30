// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource journeyFlows', () => {
  test('list', async () => {
    const responsePromise = client.journeyFlows.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.journeyFlows.list(
        {
          cursor: 'cursor',
          limit: 25,
          search: 'search',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.journeyFlows.create({
      definition: {
        anchors: [{ id: 'x', alternatives: [{ eventName: 'x', kind: 'event' }] }],
        exploration: {},
        kind: 'journey-flow',
        scope: { excludeBots: true, sourceIds: ['x'] },
        version: 1,
      },
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          timeZone: 'x',
          to: '7321-69-10',
        },
      },
      view: {},
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.journeyFlows.create({
      definition: {
        anchors: [
          {
            id: 'x',
            alternatives: [
              {
                eventName: 'x',
                kind: 'event',
                filter: {
                  filter: { children: [], kind: 'and' },
                  version: 1,
                },
              },
            ],
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            label: 'label',
          },
        ],
        exploration: {
          after: 0,
          before: 0,
          between: [
            {
              afterFrom: 0,
              beforeTo: 0,
              fromAnchorId: 'x',
              toAnchorId: 'x',
            },
          ],
          collapseRepeats: true,
          focus: [
            {
              position: {
                anchorId: 'x',
                offset: 0,
                side: 'anchor',
              },
              matcher: {
                eventName: 'x',
                kind: 'event',
                filter: {
                  filter: { children: [], kind: 'and' },
                  version: 1,
                },
              },
            },
          ],
          hiddenEvents: [
            {
              eventName: 'x',
              kind: 'event',
              filter: {
                filter: { children: [], kind: 'and' },
                version: 1,
              },
            },
          ],
          pageKey: 'path',
          pathFilter: {
            filter: { children: [], kind: 'and' },
            version: 1,
          },
          stepKinds: ['event'],
        },
        kind: 'journey-flow',
        scope: {
          excludeBots: true,
          sourceIds: ['x'],
          sessionFilter: {
            filter: { children: [], kind: 'and' },
            version: 1,
          },
        },
        version: 1,
        anchorFilter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        breakdown: {
          atAnchorId: 'x',
          property: {
            property: 'x',
            type: 'string',
            path: ['x'],
          },
          limit: 1,
        },
        contextWindowMs: 1,
        conversionWindowMs: 1,
        counting: 'unique',
        entryFilter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        exclusions: [
          {
            id: 'x',
            fromAnchorId: 'x',
            matcher: {
              eventName: 'x',
              kind: 'event',
              filter: {
                filter: { children: [], kind: 'and' },
                version: 1,
              },
            },
            toAnchorId: 'x',
          },
        ],
        holdConstant: [
          {
            property: 'x',
            type: 'string',
            path: ['x'],
          },
        ],
        nodeExpansions: [
          {
            matcher: {
              eventName: 'x',
              kind: 'event',
              filter: {
                filter: { children: [], kind: 'and' },
                version: 1,
              },
            },
            position: {
              anchorId: 'x',
              offset: 0,
              side: 'anchor',
            },
            property: {
              property: 'x',
              type: 'string',
              path: ['x'],
            },
            limit: 1,
          },
        ],
        reentry: 'first',
      },
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          timeZone: 'x',
          to: '7321-69-10',
        },
        comparisons: [
          {
            id: 'x',
            label: 'x',
            dateRange: {
              from: '7321-69-10',
              timeZone: 'x',
              to: '7321-69-10',
            },
            entryFilter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            sessionFilter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
          },
        ],
      },
      view: {
        showDropOff: true,
        showElapsedTime: true,
        topEventsPerPosition: 1,
        topPaths: 1,
        visualization: 'sankey',
      },
      description: 'description',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.journeyFlows.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.journeyFlows.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.journeyFlows.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      definition: {
        anchors: [
          {
            id: 'x',
            alternatives: [
              {
                eventName: 'x',
                kind: 'event',
                filter: {
                  filter: { children: [], kind: 'and' },
                  version: 1,
                },
              },
            ],
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            label: 'label',
          },
        ],
        exploration: {
          after: 0,
          before: 0,
          between: [
            {
              afterFrom: 0,
              beforeTo: 0,
              fromAnchorId: 'x',
              toAnchorId: 'x',
            },
          ],
          collapseRepeats: true,
          focus: [
            {
              position: {
                anchorId: 'x',
                offset: 0,
                side: 'anchor',
              },
              matcher: {
                eventName: 'x',
                kind: 'event',
                filter: {
                  filter: { children: [], kind: 'and' },
                  version: 1,
                },
              },
            },
          ],
          hiddenEvents: [
            {
              eventName: 'x',
              kind: 'event',
              filter: {
                filter: { children: [], kind: 'and' },
                version: 1,
              },
            },
          ],
          pageKey: 'path',
          pathFilter: {
            filter: { children: [], kind: 'and' },
            version: 1,
          },
          stepKinds: ['event'],
        },
        kind: 'journey-flow',
        scope: {
          excludeBots: true,
          sourceIds: ['x'],
          sessionFilter: {
            filter: { children: [], kind: 'and' },
            version: 1,
          },
        },
        version: 1,
        anchorFilter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        breakdown: {
          atAnchorId: 'x',
          property: {
            property: 'x',
            type: 'string',
            path: ['x'],
          },
          limit: 1,
        },
        contextWindowMs: 1,
        conversionWindowMs: 1,
        counting: 'unique',
        entryFilter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        exclusions: [
          {
            id: 'x',
            fromAnchorId: 'x',
            matcher: {
              eventName: 'x',
              kind: 'event',
              filter: {
                filter: { children: [], kind: 'and' },
                version: 1,
              },
            },
            toAnchorId: 'x',
          },
        ],
        holdConstant: [
          {
            property: 'x',
            type: 'string',
            path: ['x'],
          },
        ],
        nodeExpansions: [
          {
            matcher: {
              eventName: 'x',
              kind: 'event',
              filter: {
                filter: { children: [], kind: 'and' },
                version: 1,
              },
            },
            position: {
              anchorId: 'x',
              offset: 0,
              side: 'anchor',
            },
            property: {
              property: 'x',
              type: 'string',
              path: ['x'],
            },
            limit: 1,
          },
        ],
        reentry: 'first',
      },
      description: 'description',
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          timeZone: 'x',
          to: '7321-69-10',
        },
        comparisons: [
          {
            id: 'x',
            label: 'x',
            dateRange: {
              from: '7321-69-10',
              timeZone: 'x',
              to: '7321-69-10',
            },
            entryFilter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            sessionFilter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
          },
        ],
      },
      view: {
        showDropOff: true,
        showElapsedTime: true,
        topEventsPerPosition: 1,
        topPaths: 1,
        visualization: 'sankey',
      },
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.journeyFlows.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.journeyFlows.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('capabilities', async () => {
    const responsePromise = client.journeyFlows.capabilities();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('results: only required params', async () => {
    const responsePromise = client.journeyFlows.results('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('results: required and optional params', async () => {
    const response = await client.journeyFlows.results('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      refresh: true,
      reportContextOverride: 'reportContextOverride',
    });
  });

  test('export: only required params', async () => {
    const responsePromise = client.journeyFlows.export('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('export: required and optional params', async () => {
    const response = await client.journeyFlows.export('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      refresh: true,
      reportContextOverride: 'reportContextOverride',
    });
  });

  test('preview: only required params', async () => {
    const responsePromise = client.journeyFlows.preview({ input: 'input' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preview: required and optional params', async () => {
    const response = await client.journeyFlows.preview({ input: 'input' });
  });
});
