// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'list',
    endpoint: '/rest/v1/destinations',
    httpMethod: 'get',
    summary: '',
    description: 'List all destinations. Requires scope: destination:list',
    stainlessPath: '(resource) destinations > (method) list',
    qualified: 'client.destinations.list',
    response:
      "{ entities: { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; facebookConversionAPIKey?: string; facebookPixelId?: string; g4AnalyticsApiKey?: string; g4AnalyticsMeasurementId?: string; g4AnalyticsTrackOnPage?: boolean; hashingSalt?: string; httpDestinationUrl?: string; limitedToSourceIds?: string[]; managerGoogleCustomerId?: string; name?: string; projectAPIKey?: string; projectToken?: string; selectedAccountId?: string; settings?: object; updatedAt?: string; }[]; }",
    markdown:
      "## list\n\n`client.destinations.list(): { entities: object[]; }`\n\n**get** `/rest/v1/destinations`\n\nList all destinations. Requires scope: destination:list\n\n### Returns\n\n- `{ entities: { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; facebookConversionAPIKey?: string; facebookPixelId?: string; g4AnalyticsApiKey?: string; g4AnalyticsMeasurementId?: string; g4AnalyticsTrackOnPage?: boolean; hashingSalt?: string; httpDestinationUrl?: string; limitedToSourceIds?: string[]; managerGoogleCustomerId?: string; name?: string; projectAPIKey?: string; projectToken?: string; selectedAccountId?: string; settings?: object; updatedAt?: string; }[]; }`\n\n  - `entities: { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; facebookConversionAPIKey?: string; facebookPixelId?: string; g4AnalyticsApiKey?: string; g4AnalyticsMeasurementId?: string; g4AnalyticsTrackOnPage?: boolean; hashingSalt?: string; httpDestinationUrl?: string; limitedToSourceIds?: string[]; managerGoogleCustomerId?: string; name?: string; projectAPIKey?: string; projectToken?: string; selectedAccountId?: string; settings?: object; updatedAt?: string; }[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst destinations = await client.destinations.list();\n\nconsole.log(destinations);\n```",
    perLanguage: {
      typescript: {
        method: 'client.destinations.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst destinations = await client.destinations.list();\n\nconsole.log(destinations.entities);",
      },
      go: {
        method: 'client.Destinations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdestinations, err := client.Destinations.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", destinations.Entities)\n}\n',
      },
      cli: {
        method: 'destinations list',
        example: "oursprivacy destinations list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/destinations \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/destinations',
    httpMethod: 'post',
    summary: '',
    description: 'Create a new destination. Requires scope: destination:create',
    stainlessPath: '(resource) destinations > (method) create',
    qualified: 'client.destinations.create',
    params: ['type: string;', 'name?: string;'],
    response:
      "{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; updatedAt?: string; }",
    markdown:
      "## create\n\n`client.destinations.create(type: string, name?: string): { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; updatedAt?: string; }`\n\n**post** `/rest/v1/destinations`\n\nCreate a new destination. Requires scope: destination:create\n\n### Parameters\n\n- `type: string`\n\n- `name?: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `type: string`\n  - `name?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst destination = await client.destinations.create({ type: 'AWSEventBridge' });\n\nconsole.log(destination);\n```",
    perLanguage: {
      typescript: {
        method: 'client.destinations.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst destination = await client.destinations.create({ type: 'AWSEventBridge' });\n\nconsole.log(destination.id);",
      },
      go: {
        method: 'client.Destinations.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdestination, err := client.Destinations.New(context.TODO(), githubcomwithoursplatformsdkgo.DestinationNewParams{\n\t\tType: githubcomwithoursplatformsdkgo.DestinationNewParamsTypeAwsEventBridge,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", destination.ID)\n}\n',
      },
      cli: {
        method: 'destinations create',
        example: "oursprivacy destinations create \\\n  --api-key 'My API Key' \\\n  --type AWSEventBridge",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/destinations \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY" \\\n    -d \'{\n          "type": "AWSEventBridge"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/destinations/{id}',
    httpMethod: 'get',
    summary: '',
    description: 'Find a single destination by ID. Requires scope: destination:find',
    stainlessPath: '(resource) destinations > (method) retrieve',
    qualified: 'client.destinations.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; facebookConversionAPIKey?: string; facebookPixelId?: string; g4AnalyticsApiKey?: string; g4AnalyticsMeasurementId?: string; g4AnalyticsTrackOnPage?: boolean; hashingSalt?: string; httpDestinationUrl?: string; limitedToSourceIds?: string[]; managerGoogleCustomerId?: string; name?: string; projectAPIKey?: string; projectToken?: string; selectedAccountId?: string; settings?: object; updatedAt?: string; }",
    markdown:
      "## retrieve\n\n`client.destinations.retrieve(id: string): { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; facebookConversionAPIKey?: string; facebookPixelId?: string; g4AnalyticsApiKey?: string; g4AnalyticsMeasurementId?: string; g4AnalyticsTrackOnPage?: boolean; hashingSalt?: string; httpDestinationUrl?: string; limitedToSourceIds?: string[]; managerGoogleCustomerId?: string; name?: string; projectAPIKey?: string; projectToken?: string; selectedAccountId?: string; settings?: object; updatedAt?: string; }`\n\n**get** `/rest/v1/destinations/{id}`\n\nFind a single destination by ID. Requires scope: destination:find\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; facebookConversionAPIKey?: string; facebookPixelId?: string; g4AnalyticsApiKey?: string; g4AnalyticsMeasurementId?: string; g4AnalyticsTrackOnPage?: boolean; hashingSalt?: string; httpDestinationUrl?: string; limitedToSourceIds?: string[]; managerGoogleCustomerId?: string; name?: string; projectAPIKey?: string; projectToken?: string; selectedAccountId?: string; settings?: object; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `type: string`\n  - `facebookConversionAPIKey?: string`\n  - `facebookPixelId?: string`\n  - `g4AnalyticsApiKey?: string`\n  - `g4AnalyticsMeasurementId?: string`\n  - `g4AnalyticsTrackOnPage?: boolean`\n  - `hashingSalt?: string`\n  - `httpDestinationUrl?: string`\n  - `limitedToSourceIds?: string[]`\n  - `managerGoogleCustomerId?: string`\n  - `name?: string`\n  - `projectAPIKey?: string`\n  - `projectToken?: string`\n  - `selectedAccountId?: string`\n  - `settings?: object`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst destination = await client.destinations.retrieve('id');\n\nconsole.log(destination);\n```",
    perLanguage: {
      typescript: {
        method: 'client.destinations.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst destination = await client.destinations.retrieve('id');\n\nconsole.log(destination.id);",
      },
      go: {
        method: 'client.Destinations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdestination, err := client.Destinations.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", destination.ID)\n}\n',
      },
      cli: {
        method: 'destinations retrieve',
        example: "oursprivacy destinations retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/destinations/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/rest/v1/destinations/{id}',
    httpMethod: 'patch',
    summary: '',
    description:
      'Partially update a destination. Only the fields you send are changed. Requires scope: destination:update',
    stainlessPath: '(resource) destinations > (method) update',
    qualified: 'client.destinations.update',
    params: [
      'id: string;',
      "status: 'Disabled' | 'Enabled';",
      'facebookConversionAPIKey?: string;',
      'facebookPixelId?: string;',
      'g4AnalyticsApiKey?: string;',
      'g4AnalyticsMeasurementId?: string;',
      'g4AnalyticsTrackOnPage?: boolean;',
      'hashingSalt?: string;',
      'httpDestinationUrl?: string;',
      'limitedToSourceIds?: string[];',
      'managerGoogleCustomerId?: string;',
      'name?: string;',
      'projectAPIKey?: string;',
      'projectToken?: string;',
      'selectedAccountId?: string;',
      'settings?: object;',
    ],
    response:
      "{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; updatedAt?: string; }",
    markdown:
      "## update\n\n`client.destinations.update(id: string, status: 'Disabled' | 'Enabled', facebookConversionAPIKey?: string, facebookPixelId?: string, g4AnalyticsApiKey?: string, g4AnalyticsMeasurementId?: string, g4AnalyticsTrackOnPage?: boolean, hashingSalt?: string, httpDestinationUrl?: string, limitedToSourceIds?: string[], managerGoogleCustomerId?: string, name?: string, projectAPIKey?: string, projectToken?: string, selectedAccountId?: string, settings?: object): { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; updatedAt?: string; }`\n\n**patch** `/rest/v1/destinations/{id}`\n\nPartially update a destination. Only the fields you send are changed. Requires scope: destination:update\n\n### Parameters\n\n- `id: string`\n\n- `status: 'Disabled' | 'Enabled'`\n\n- `facebookConversionAPIKey?: string`\n\n- `facebookPixelId?: string`\n\n- `g4AnalyticsApiKey?: string`\n\n- `g4AnalyticsMeasurementId?: string`\n\n- `g4AnalyticsTrackOnPage?: boolean`\n\n- `hashingSalt?: string`\n\n- `httpDestinationUrl?: string`\n\n- `limitedToSourceIds?: string[]`\n\n- `managerGoogleCustomerId?: string`\n\n- `name?: string`\n\n- `projectAPIKey?: string`\n\n- `projectToken?: string`\n\n- `selectedAccountId?: string`\n\n- `settings?: object`\n\n### Returns\n\n- `{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `type: string`\n  - `name?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst destination = await client.destinations.update('id', { status: 'Disabled' });\n\nconsole.log(destination);\n```",
    perLanguage: {
      typescript: {
        method: 'client.destinations.update',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst destination = await client.destinations.update('id', { status: 'Disabled' });\n\nconsole.log(destination.id);",
      },
      go: {
        method: 'client.Destinations.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdestination, err := client.Destinations.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomwithoursplatformsdkgo.DestinationUpdateParams{\n\t\t\tStatus: githubcomwithoursplatformsdkgo.DestinationUpdateParamsStatusDisabled,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", destination.ID)\n}\n',
      },
      cli: {
        method: 'destinations update',
        example:
          "oursprivacy destinations update \\\n  --api-key 'My API Key' \\\n  --id id \\\n  --status Disabled",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/destinations/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY" \\\n    -d \'{\n          "status": "Disabled"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/rest/v1/destinations/{id}',
    httpMethod: 'delete',
    summary: '',
    description: 'Delete a destination. Requires scope: destination:delete',
    stainlessPath: '(resource) destinations > (method) delete',
    qualified: 'client.destinations.delete',
    params: ['id: string;'],
    response: 'boolean',
    markdown:
      "## delete\n\n`client.destinations.delete(id: string): boolean`\n\n**delete** `/rest/v1/destinations/{id}`\n\nDelete a destination. Requires scope: destination:delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `boolean`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst destination = await client.destinations.delete('id');\n\nconsole.log(destination);\n```",
    perLanguage: {
      typescript: {
        method: 'client.destinations.delete',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst destination = await client.destinations.delete('id');\n\nconsole.log(destination);",
      },
      go: {
        method: 'client.Destinations.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdestination, err := client.Destinations.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", destination)\n}\n',
      },
      cli: {
        method: 'destinations delete',
        example: "oursprivacy destinations delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/destinations/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/rest/v1/sources',
    httpMethod: 'get',
    summary: '',
    description: 'List all sources. Requires scope: source:list',
    stainlessPath: '(resource) sources > (method) list',
    qualified: 'client.sources.list',
    response:
      "{ entities: { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; botControlMode?: string; botScoreThreshold?: number; excludeRequestContext?: boolean; name?: string; probabilisticIdentity?: object; projectAPIKey?: string; redirectUrl?: string; selectedAccountId?: string; whitelistDomains?: string[]; whitelistIps?: string[]; }[]; }",
    markdown:
      "## list\n\n`client.sources.list(): { entities: object[]; }`\n\n**get** `/rest/v1/sources`\n\nList all sources. Requires scope: source:list\n\n### Returns\n\n- `{ entities: { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; botControlMode?: string; botScoreThreshold?: number; excludeRequestContext?: boolean; name?: string; probabilisticIdentity?: object; projectAPIKey?: string; redirectUrl?: string; selectedAccountId?: string; whitelistDomains?: string[]; whitelistIps?: string[]; }[]; }`\n\n  - `entities: { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; botControlMode?: string; botScoreThreshold?: number; excludeRequestContext?: boolean; name?: string; probabilisticIdentity?: object; projectAPIKey?: string; redirectUrl?: string; selectedAccountId?: string; whitelistDomains?: string[]; whitelistIps?: string[]; }[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst sources = await client.sources.list();\n\nconsole.log(sources);\n```",
    perLanguage: {
      typescript: {
        method: 'client.sources.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst sources = await client.sources.list();\n\nconsole.log(sources.entities);",
      },
      go: {
        method: 'client.Sources.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsources, err := client.Sources.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sources.Entities)\n}\n',
      },
      cli: {
        method: 'sources list',
        example: "oursprivacy sources list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/sources \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/sources',
    httpMethod: 'post',
    summary: '',
    description: 'Create a new source. Requires scope: source:create',
    stainlessPath: '(resource) sources > (method) create',
    qualified: 'client.sources.create',
    params: ['type: string;', 'name?: string;'],
    response:
      "{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; }",
    markdown:
      "## create\n\n`client.sources.create(type: string, name?: string): { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; }`\n\n**post** `/rest/v1/sources`\n\nCreate a new source. Requires scope: source:create\n\n### Parameters\n\n- `type: string`\n\n- `name?: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `type: string`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst source = await client.sources.create({ type: 'AlchemerWebhook' });\n\nconsole.log(source);\n```",
    perLanguage: {
      typescript: {
        method: 'client.sources.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst source = await client.sources.create({ type: 'AlchemerWebhook' });\n\nconsole.log(source.id);",
      },
      go: {
        method: 'client.Sources.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsource, err := client.Sources.New(context.TODO(), githubcomwithoursplatformsdkgo.SourceNewParams{\n\t\tType: githubcomwithoursplatformsdkgo.SourceNewParamsTypeAlchemerWebhook,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", source.ID)\n}\n',
      },
      cli: {
        method: 'sources create',
        example: "oursprivacy sources create \\\n  --api-key 'My API Key' \\\n  --type AlchemerWebhook",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/sources \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY" \\\n    -d \'{\n          "type": "AlchemerWebhook"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/sources/{id}',
    httpMethod: 'get',
    summary: '',
    description: 'Find a single source by ID. Requires scope: source:view',
    stainlessPath: '(resource) sources > (method) retrieve',
    qualified: 'client.sources.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; botControlMode?: string; botScoreThreshold?: number; excludeRequestContext?: boolean; name?: string; probabilisticIdentity?: object; projectAPIKey?: string; redirectUrl?: string; selectedAccountId?: string; whitelistDomains?: string[]; whitelistIps?: string[]; }",
    markdown:
      "## retrieve\n\n`client.sources.retrieve(id: string): { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; botControlMode?: string; botScoreThreshold?: number; excludeRequestContext?: boolean; name?: string; probabilisticIdentity?: object; projectAPIKey?: string; redirectUrl?: string; selectedAccountId?: string; whitelistDomains?: string[]; whitelistIps?: string[]; }`\n\n**get** `/rest/v1/sources/{id}`\n\nFind a single source by ID. Requires scope: source:view\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; botControlMode?: string; botScoreThreshold?: number; excludeRequestContext?: boolean; name?: string; probabilisticIdentity?: object; projectAPIKey?: string; redirectUrl?: string; selectedAccountId?: string; whitelistDomains?: string[]; whitelistIps?: string[]; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `type: string`\n  - `botControlMode?: string`\n  - `botScoreThreshold?: number`\n  - `excludeRequestContext?: boolean`\n  - `name?: string`\n  - `probabilisticIdentity?: object`\n  - `projectAPIKey?: string`\n  - `redirectUrl?: string`\n  - `selectedAccountId?: string`\n  - `whitelistDomains?: string[]`\n  - `whitelistIps?: string[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst source = await client.sources.retrieve('id');\n\nconsole.log(source);\n```",
    perLanguage: {
      typescript: {
        method: 'client.sources.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst source = await client.sources.retrieve('id');\n\nconsole.log(source.id);",
      },
      go: {
        method: 'client.Sources.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsource, err := client.Sources.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", source.ID)\n}\n',
      },
      cli: {
        method: 'sources retrieve',
        example: "oursprivacy sources retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/sources/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/rest/v1/sources/{id}',
    httpMethod: 'patch',
    summary: '',
    description:
      'Partially update a source. Only the fields you send are changed. Requires scope: source:update',
    stainlessPath: '(resource) sources > (method) update',
    qualified: 'client.sources.update',
    params: [
      'id: string;',
      "status: 'Disabled' | 'Enabled';",
      'botControlMode?: string;',
      'botScoreThreshold?: number;',
      'excludeRequestContext?: boolean;',
      'name?: string;',
      'probabilisticIdentity?: object;',
      'projectAPIKey?: string;',
      'redirectUrl?: string;',
      'selectedAccountId?: string;',
      'whitelistDomains?: string[];',
      'whitelistIps?: string[];',
    ],
    response:
      "{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; }",
    markdown:
      "## update\n\n`client.sources.update(id: string, status: 'Disabled' | 'Enabled', botControlMode?: string, botScoreThreshold?: number, excludeRequestContext?: boolean, name?: string, probabilisticIdentity?: object, projectAPIKey?: string, redirectUrl?: string, selectedAccountId?: string, whitelistDomains?: string[], whitelistIps?: string[]): { id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; }`\n\n**patch** `/rest/v1/sources/{id}`\n\nPartially update a source. Only the fields you send are changed. Requires scope: source:update\n\n### Parameters\n\n- `id: string`\n\n- `status: 'Disabled' | 'Enabled'`\n\n- `botControlMode?: string`\n\n- `botScoreThreshold?: number`\n\n- `excludeRequestContext?: boolean`\n\n- `name?: string`\n\n- `probabilisticIdentity?: object`\n\n- `projectAPIKey?: string`\n\n- `redirectUrl?: string`\n\n- `selectedAccountId?: string`\n\n- `whitelistDomains?: string[]`\n\n- `whitelistIps?: string[]`\n\n### Returns\n\n- `{ id: string; createdAt: string; status: 'Disabled' | 'Enabled'; type: string; name?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `type: string`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst source = await client.sources.update('id', { status: 'Disabled' });\n\nconsole.log(source);\n```",
    perLanguage: {
      typescript: {
        method: 'client.sources.update',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst source = await client.sources.update('id', { status: 'Disabled' });\n\nconsole.log(source.id);",
      },
      go: {
        method: 'client.Sources.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsource, err := client.Sources.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomwithoursplatformsdkgo.SourceUpdateParams{\n\t\t\tStatus: githubcomwithoursplatformsdkgo.SourceUpdateParamsStatusDisabled,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", source.ID)\n}\n',
      },
      cli: {
        method: 'sources update',
        example:
          "oursprivacy sources update \\\n  --api-key 'My API Key' \\\n  --id id \\\n  --status Disabled",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/sources/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY" \\\n    -d \'{\n          "status": "Disabled"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/rest/v1/sources/{id}',
    httpMethod: 'delete',
    summary: '',
    description: 'Delete a source. Requires scope: source:delete',
    stainlessPath: '(resource) sources > (method) delete',
    qualified: 'client.sources.delete',
    params: ['id: string;'],
    response: 'boolean',
    markdown:
      "## delete\n\n`client.sources.delete(id: string): boolean`\n\n**delete** `/rest/v1/sources/{id}`\n\nDelete a source. Requires scope: source:delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `boolean`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst source = await client.sources.delete('id');\n\nconsole.log(source);\n```",
    perLanguage: {
      typescript: {
        method: 'client.sources.delete',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst source = await client.sources.delete('id');\n\nconsole.log(source);",
      },
      go: {
        method: 'client.Sources.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsource, err := client.Sources.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", source)\n}\n',
      },
      cli: {
        method: 'sources delete',
        example: "oursprivacy sources delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/sources/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/rest/v1/allowed-events',
    httpMethod: 'get',
    summary: '',
    description: 'List all allowed events. Requires scope: allowedEvent:list',
    stainlessPath: '(resource) allowed_events > (method) list',
    qualified: 'client.allowedEvents.list',
    response:
      '{ entities: { id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }[]; }',
    markdown:
      "## list\n\n`client.allowedEvents.list(): { entities: object[]; }`\n\n**get** `/rest/v1/allowed-events`\n\nList all allowed events. Requires scope: allowedEvent:list\n\n### Returns\n\n- `{ entities: { id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }[]; }`\n\n  - `entities: { id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst allowedEvents = await client.allowedEvents.list();\n\nconsole.log(allowedEvents);\n```",
    perLanguage: {
      typescript: {
        method: 'client.allowedEvents.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst allowedEvents = await client.allowedEvents.list();\n\nconsole.log(allowedEvents.entities);",
      },
      go: {
        method: 'client.AllowedEvents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tallowedEvents, err := client.AllowedEvents.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", allowedEvents.Entities)\n}\n',
      },
      cli: {
        method: 'allowed_events list',
        example: "oursprivacy allowed-events list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/allowed-events \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/allowed-events',
    httpMethod: 'post',
    summary: '',
    description: 'Create a new allowed event. Requires scope: allowedEvent:create',
    stainlessPath: '(resource) allowed_events > (method) create',
    qualified: 'client.allowedEvents.create',
    params: ['name: string;', 'destinationIds?: string[];'],
    response:
      '{ id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }',
    markdown:
      "## create\n\n`client.allowedEvents.create(name: string, destinationIds?: string[]): { id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }`\n\n**post** `/rest/v1/allowed-events`\n\nCreate a new allowed event. Requires scope: allowedEvent:create\n\n### Parameters\n\n- `name: string`\n\n- `destinationIds?: string[]`\n\n### Returns\n\n- `{ id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `destinationIds: string[]`\n  - `name: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst allowedEvent = await client.allowedEvents.create({ name: 'name' });\n\nconsole.log(allowedEvent);\n```",
    perLanguage: {
      typescript: {
        method: 'client.allowedEvents.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst allowedEvent = await client.allowedEvents.create({ name: 'name' });\n\nconsole.log(allowedEvent.id);",
      },
      go: {
        method: 'client.AllowedEvents.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tallowedEvent, err := client.AllowedEvents.New(context.TODO(), githubcomwithoursplatformsdkgo.AllowedEventNewParams{\n\t\tName: "name",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", allowedEvent.ID)\n}\n',
      },
      cli: {
        method: 'allowed_events create',
        example: "oursprivacy allowed-events create \\\n  --api-key 'My API Key' \\\n  --name name",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/allowed-events \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY" \\\n    -d \'{\n          "name": "name"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/allowed-events/{id}',
    httpMethod: 'get',
    summary: '',
    description: 'Find a single allowed event by ID. Requires scope: allowedEvent:find',
    stainlessPath: '(resource) allowed_events > (method) retrieve',
    qualified: 'client.allowedEvents.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.allowedEvents.retrieve(id: string): { id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }`\n\n**get** `/rest/v1/allowed-events/{id}`\n\nFind a single allowed event by ID. Requires scope: allowedEvent:find\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; destinationIds: string[]; name: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `destinationIds: string[]`\n  - `name: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst allowedEvent = await client.allowedEvents.retrieve('id');\n\nconsole.log(allowedEvent);\n```",
    perLanguage: {
      typescript: {
        method: 'client.allowedEvents.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst allowedEvent = await client.allowedEvents.retrieve('id');\n\nconsole.log(allowedEvent.id);",
      },
      go: {
        method: 'client.AllowedEvents.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tallowedEvent, err := client.AllowedEvents.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", allowedEvent.ID)\n}\n',
      },
      cli: {
        method: 'allowed_events retrieve',
        example: "oursprivacy allowed-events retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/allowed-events/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/rest/v1/allowed-events/{id}',
    httpMethod: 'delete',
    summary: '',
    description: 'Delete a allowed event. Requires scope: allowedEvent:delete',
    stainlessPath: '(resource) allowed_events > (method) delete',
    qualified: 'client.allowedEvents.delete',
    params: ['id: string;'],
    response: 'boolean',
    markdown:
      "## delete\n\n`client.allowedEvents.delete(id: string): boolean`\n\n**delete** `/rest/v1/allowed-events/{id}`\n\nDelete a allowed event. Requires scope: allowedEvent:delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `boolean`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst allowedEvent = await client.allowedEvents.delete('id');\n\nconsole.log(allowedEvent);\n```",
    perLanguage: {
      typescript: {
        method: 'client.allowedEvents.delete',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst allowedEvent = await client.allowedEvents.delete('id');\n\nconsole.log(allowedEvent);",
      },
      go: {
        method: 'client.AllowedEvents.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tallowedEvent, err := client.AllowedEvents.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", allowedEvent)\n}\n',
      },
      cli: {
        method: 'allowed_events delete',
        example: "oursprivacy allowed-events delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/allowed-events/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/rest/v1/consent-settings',
    httpMethod: 'get',
    summary: '',
    description: 'List all consent settings. Requires scope: consentSettings:list',
    stainlessPath: '(resource) consent_settings > (method) list',
    qualified: 'client.consentSettings.list',
    response:
      "{ entities: { id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: object; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }[]; }",
    markdown:
      "## list\n\n`client.consentSettings.list(): { entities: object[]; }`\n\n**get** `/rest/v1/consent-settings`\n\nList all consent settings. Requires scope: consentSettings:list\n\n### Returns\n\n- `{ entities: { id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: object; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }[]; }`\n\n  - `entities: { id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: { categories: { key: string; value: object; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: object; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst consentSettings = await client.consentSettings.list();\n\nconsole.log(consentSettings);\n```",
    perLanguage: {
      typescript: {
        method: 'client.consentSettings.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst consentSettings = await client.consentSettings.list();\n\nconsole.log(consentSettings.entities);",
      },
      go: {
        method: 'client.ConsentSettings.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tconsentSettings, err := client.ConsentSettings.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", consentSettings.Entities)\n}\n',
      },
      cli: {
        method: 'consent_settings list',
        example: "oursprivacy consent-settings list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/consent-settings \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/consent-settings',
    httpMethod: 'post',
    summary: '',
    description:
      'Create a new consent settings record. POST takes no request body — the server initializes the record with defaults (Disabled status, opt-out default rule, English translations, necessary/analytics/advertising categories, no regions, no whitelisted domains). Configure the record afterward with PATCH (partial update) or PUT (full replacement). Returns the same shape as GET so you can read the server-assigned `id`, default rule, and categories without a follow-up fetch. Requires scope: consentSettings:create',
    stainlessPath: '(resource) consent_settings > (method) create',
    qualified: 'client.consentSettings.create',
    response:
      "{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: object; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }",
    markdown:
      "## create\n\n`client.consentSettings.create(): { id: string; categories: object[]; createdAt: string; default: object; kind: string; name: string; regions: object[]; services: object[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n**post** `/rest/v1/consent-settings`\n\nCreate a new consent settings record. POST takes no request body — the server initializes the record with defaults (Disabled status, opt-out default rule, English translations, necessary/analytics/advertising categories, no regions, no whitelisted domains). Configure the record afterward with PATCH (partial update) or PUT (full replacement). Returns the same shape as GET so you can read the server-assigned `id`, default rule, and categories without a follow-up fetch. Requires scope: consentSettings:create\n\n### Returns\n\n- `{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: { key: string; value: object; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: object; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n  - `id: string`\n  - `categories: { label: string; priority: number; value: string; }[]`\n  - `createdAt: string`\n  - `default: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }`\n  - `kind: string`\n  - `name: string`\n  - `regions: { regionCode: string; rule: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]`\n  - `services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]`\n  - `status: 'Disabled' | 'Enabled'`\n  - `consentCookieName?: string`\n  - `customDomain?: string`\n  - `revision?: number`\n  - `skipBlockingClassNames?: string[]`\n  - `updatedAt?: string`\n  - `webSDKToken?: string`\n  - `whitelistDomains?: string[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst consentSetting = await client.consentSettings.create();\n\nconsole.log(consentSetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.consentSettings.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst consentSetting = await client.consentSettings.create();\n\nconsole.log(consentSetting.id);",
      },
      go: {
        method: 'client.ConsentSettings.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tconsentSetting, err := client.ConsentSettings.New(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", consentSetting.ID)\n}\n',
      },
      cli: {
        method: 'consent_settings create',
        example: "oursprivacy consent-settings create \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/consent-settings \\\n    -X POST \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/consent-settings/{id}',
    httpMethod: 'get',
    summary: '',
    description: 'Find a single consent setting by ID. Requires scope: consentSettings:find',
    stainlessPath: '(resource) consent_settings > (method) retrieve',
    qualified: 'client.consentSettings.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: object; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }",
    markdown:
      "## retrieve\n\n`client.consentSettings.retrieve(id: string): { id: string; categories: object[]; createdAt: string; default: object; kind: string; name: string; regions: object[]; services: object[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n**get** `/rest/v1/consent-settings/{id}`\n\nFind a single consent setting by ID. Requires scope: consentSettings:find\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: { key: string; value: object; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: object; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n  - `id: string`\n  - `categories: { label: string; priority: number; value: string; }[]`\n  - `createdAt: string`\n  - `default: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }`\n  - `kind: string`\n  - `name: string`\n  - `regions: { regionCode: string; rule: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]`\n  - `services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]`\n  - `status: 'Disabled' | 'Enabled'`\n  - `consentCookieName?: string`\n  - `customDomain?: string`\n  - `revision?: number`\n  - `skipBlockingClassNames?: string[]`\n  - `updatedAt?: string`\n  - `webSDKToken?: string`\n  - `whitelistDomains?: string[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst consentSetting = await client.consentSettings.retrieve('id');\n\nconsole.log(consentSetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.consentSettings.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst consentSetting = await client.consentSettings.retrieve('id');\n\nconsole.log(consentSetting.id);",
      },
      go: {
        method: 'client.ConsentSettings.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tconsentSetting, err := client.ConsentSettings.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", consentSetting.ID)\n}\n',
      },
      cli: {
        method: 'consent_settings retrieve',
        example: "oursprivacy consent-settings retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/consent-settings/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/rest/v1/consent-settings/{id}',
    httpMethod: 'patch',
    summary: '',
    description:
      'Partially update a consent setting. Send only the fields you want to change — every field is optional and unspecified fields are preserved. List-valued fields (services, categories, regions) are replaced wholesale when sent. Requires scope: consentSettings:update',
    stainlessPath: '(resource) consent_settings > (method) update',
    qualified: 'client.consentSettings.update',
    params: [
      'id: string;',
      'categories?: { label: string; priority: number; value: string; }[];',
      'consentCookieName?: string;',
      'customDomain?: string;',
      "default?: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; };",
      'name?: string;',
      "regions?: { regionCode: string; rule: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[];",
      'revision?: number;',
      'services?: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[];',
      'skipBlockingClassNames?: string[];',
      "status?: 'Disabled' | 'Enabled';",
      'webSDKToken?: string;',
      'whitelistDomains?: string[];',
    ],
    response:
      "{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: object; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }",
    markdown:
      "## update\n\n`client.consentSettings.update(id: string, categories?: { label: string; priority: number; value: string; }[], consentCookieName?: string, customDomain?: string, default?: { categories: { key: string; value: object; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: object; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }, name?: string, regions?: { regionCode: string; rule: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[], revision?: number, services?: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[], skipBlockingClassNames?: string[], status?: 'Disabled' | 'Enabled', webSDKToken?: string, whitelistDomains?: string[]): { id: string; categories: object[]; createdAt: string; default: object; kind: string; name: string; regions: object[]; services: object[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n**patch** `/rest/v1/consent-settings/{id}`\n\nPartially update a consent setting. Send only the fields you want to change — every field is optional and unspecified fields are preserved. List-valued fields (services, categories, regions) are replaced wholesale when sent. Requires scope: consentSettings:update\n\n### Parameters\n\n- `id: string`\n\n- `categories?: { label: string; priority: number; value: string; }[]`\n  Replace the entire categories list. Omit to leave existing categories untouched.\n\n- `consentCookieName?: string`\n  Set or clear the consent cookie name.\n\n- `customDomain?: string`\n  Set or clear the custom CDN domain.\n\n- `default?: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }`\n  Replace the default rule wholesale. Omit to leave it untouched.\n  - `categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]`\n    Per-category default config for this rule. Every category defined in the top-level `categories[].value` should have an entry here.\n  - `language: string`\n    BCP 47 default language for this rule. Must have a matching entry in `translations`. Examples: \"en\", \"en-US\", \"es\", \"de\".\n  - `mode: 'opt_in' | 'opt_out'`\n    opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by default until user rejects (CCPA style).\n  - `translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]`\n    All UI copy, keyed by language. Must include an entry whose `language` matches the rule's `language` field.\n  - `autoblockUnknown?: boolean`\n    When true, scripts not classified by services[] are blocked until the user opts in.\n  - `autoShow?: boolean`\n    When true, the consent modal auto-opens on page load.\n  - `autoShowDismissConfig?: object`\n    Threshold config for autoShowDismissMode (page count or seconds).\n  - `autoShowDismissMode?: string`\n    How the modal is treated as dismissed (never, after_pages, after_seconds).\n  - `disablePageInteraction?: boolean`\n    When true, the rest of the page is locked behind a backdrop until the user chooses.\n  - `guiOptions?: object`\n    Visual options for the modals (layout/position/colors).\n  - `hideFromBots?: boolean`\n    When true, the modal is suppressed for known bot user agents.\n  - `showVendorsInPreferences?: boolean`\n    When true, the per-service list (services[]) is rendered inside the preferences modal.\n\n- `name?: string`\n  Rename the consent settings record.\n\n- `regions?: { regionCode: string; rule: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]`\n  Replace the entire regions list. Omit to leave it untouched. To change one region, send the full regions array with that region's rule modified.\n\n- `revision?: number`\n  Bump the revision counter to re-prompt users.\n\n- `services?: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]`\n  Replace the entire services list. Omit to leave existing services untouched.\n\n- `skipBlockingClassNames?: string[]`\n  Replace the skipBlockingClassNames list. Pass null/[] to clear.\n\n- `status?: 'Disabled' | 'Enabled'`\n  Toggle Enabled/Disabled without re-sending the rest of the config.\n\n- `webSDKToken?: string`\n  Set or clear the WebSource pixel link. A non-null token must be a valid WebSource of yours.\n\n- `whitelistDomains?: string[]`\n  Replace the allowlist. Pass null/[] to clear.\n\n### Returns\n\n- `{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: { key: string; value: object; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: object; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n  - `id: string`\n  - `categories: { label: string; priority: number; value: string; }[]`\n  - `createdAt: string`\n  - `default: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }`\n  - `kind: string`\n  - `name: string`\n  - `regions: { regionCode: string; rule: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]`\n  - `services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]`\n  - `status: 'Disabled' | 'Enabled'`\n  - `consentCookieName?: string`\n  - `customDomain?: string`\n  - `revision?: number`\n  - `skipBlockingClassNames?: string[]`\n  - `updatedAt?: string`\n  - `webSDKToken?: string`\n  - `whitelistDomains?: string[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst consentSetting = await client.consentSettings.update('id');\n\nconsole.log(consentSetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.consentSettings.update',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst consentSetting = await client.consentSettings.update('id');\n\nconsole.log(consentSetting.id);",
      },
      go: {
        method: 'client.ConsentSettings.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tconsentSetting, err := client.ConsentSettings.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomwithoursplatformsdkgo.ConsentSettingUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", consentSetting.ID)\n}\n',
      },
      cli: {
        method: 'consent_settings update',
        example: "oursprivacy consent-settings update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/consent-settings/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/rest/v1/consent-settings/{id}',
    httpMethod: 'delete',
    summary: '',
    description: 'Delete a consent setting. Requires scope: consentSettings:delete',
    stainlessPath: '(resource) consent_settings > (method) delete',
    qualified: 'client.consentSettings.delete',
    params: ['id: string;'],
    response:
      "{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: object; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }",
    markdown:
      "## delete\n\n`client.consentSettings.delete(id: string): { id: string; categories: object[]; createdAt: string; default: object; kind: string; name: string; regions: object[]; services: object[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n**delete** `/rest/v1/consent-settings/{id}`\n\nDelete a consent setting. Requires scope: consentSettings:delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; categories: { label: string; priority: number; value: string; }[]; createdAt: string; default: { categories: { key: string; value: object; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: object; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; kind: string; name: string; regions: { regionCode: string; rule: { categories: object[]; language: string; mode: 'opt_in' | 'opt_out'; translations: object[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]; services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]; status: 'Disabled' | 'Enabled'; consentCookieName?: string; customDomain?: string; revision?: number; skipBlockingClassNames?: string[]; updatedAt?: string; webSDKToken?: string; whitelistDomains?: string[]; }`\n\n  - `id: string`\n  - `categories: { label: string; priority: number; value: string; }[]`\n  - `createdAt: string`\n  - `default: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }`\n  - `kind: string`\n  - `name: string`\n  - `regions: { regionCode: string; rule: { categories: { key: string; value: { enabled: boolean; autoDisableOnGPC?: boolean; readOnly?: boolean; reloadPage?: boolean; }; }[]; language: string; mode: 'opt_in' | 'opt_out'; translations: { language: string; value: { consentModal?: object; preferencesModal?: object; }; }[]; autoblockUnknown?: boolean; autoShow?: boolean; autoShowDismissConfig?: object; autoShowDismissMode?: string; disablePageInteraction?: boolean; guiOptions?: object; hideFromBots?: boolean; showVendorsInPreferences?: boolean; }; additionalRegions?: string[]; }[]`\n  - `services: { internalNotes: string; label: string; additionalCategories?: string[]; category?: string; domainPatterns?: string[]; }[]`\n  - `status: 'Disabled' | 'Enabled'`\n  - `consentCookieName?: string`\n  - `customDomain?: string`\n  - `revision?: number`\n  - `skipBlockingClassNames?: string[]`\n  - `updatedAt?: string`\n  - `webSDKToken?: string`\n  - `whitelistDomains?: string[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst consentSetting = await client.consentSettings.delete('id');\n\nconsole.log(consentSetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.consentSettings.delete',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst consentSetting = await client.consentSettings.delete('id');\n\nconsole.log(consentSetting.id);",
      },
      go: {
        method: 'client.ConsentSettings.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tconsentSetting, err := client.ConsentSettings.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", consentSetting.ID)\n}\n',
      },
      cli: {
        method: 'consent_settings delete',
        example: "oursprivacy consent-settings delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/consent-settings/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/rest/v1/global-dispatch-centers',
    httpMethod: 'get',
    summary: '',
    description: 'List all global dispatch centers. Requires scope: globalDispatch:list',
    stainlessPath: '(resource) global_dispatch_centers > (method) list',
    qualified: 'client.globalDispatchCenters.list',
    response:
      '{ entities: { id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }[]; }',
    markdown:
      "## list\n\n`client.globalDispatchCenters.list(): { entities: object[]; }`\n\n**get** `/rest/v1/global-dispatch-centers`\n\nList all global dispatch centers. Requires scope: globalDispatch:list\n\n### Returns\n\n- `{ entities: { id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }[]; }`\n\n  - `entities: { id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst globalDispatchCenters = await client.globalDispatchCenters.list();\n\nconsole.log(globalDispatchCenters);\n```",
    perLanguage: {
      typescript: {
        method: 'client.globalDispatchCenters.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst globalDispatchCenters = await client.globalDispatchCenters.list();\n\nconsole.log(globalDispatchCenters.entities);",
      },
      go: {
        method: 'client.GlobalDispatchCenters.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tglobalDispatchCenters, err := client.GlobalDispatchCenters.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", globalDispatchCenters.Entities)\n}\n',
      },
      cli: {
        method: 'global_dispatch_centers list',
        example: "oursprivacy global-dispatch-centers list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/global-dispatch-centers \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/global-dispatch-centers',
    httpMethod: 'post',
    summary: '',
    description: 'Create a new global dispatch center. Requires scope: globalDispatch:create',
    stainlessPath: '(resource) global_dispatch_centers > (method) create',
    qualified: 'client.globalDispatchCenters.create',
    params: ['isEnabled?: boolean;', 'name?: string;', 'notes?: string;'],
    response:
      '{ id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }',
    markdown:
      '## create\n\n`client.globalDispatchCenters.create(isEnabled?: boolean, name?: string, notes?: string): { id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: object[]; name?: string; notes?: string; updatedAt?: string; }`\n\n**post** `/rest/v1/global-dispatch-centers`\n\nCreate a new global dispatch center. Requires scope: globalDispatch:create\n\n### Parameters\n\n- `isEnabled?: boolean`\n  Whether the center starts enabled. Defaults to false — opt in by setting true here or via PATCH later.\n\n- `name?: string`\n  Display name for the new center. Defaults to "Consent Dispatch Center".\n\n- `notes?: string`\n  Free-form notes shown in the dashboard. Not used for routing.\n\n### Returns\n\n- `{ id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `isEnabled: boolean`\n  - `kind: string`\n  - `categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]`\n  - `name?: string`\n  - `notes?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from \'@oursprivacy/platform-sdk\';\n\nconst client = new OursPrivacyPlatform();\n\nconst globalDispatchCenter = await client.globalDispatchCenters.create();\n\nconsole.log(globalDispatchCenter);\n```',
    perLanguage: {
      typescript: {
        method: 'client.globalDispatchCenters.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst globalDispatchCenter = await client.globalDispatchCenters.create();\n\nconsole.log(globalDispatchCenter.id);",
      },
      go: {
        method: 'client.GlobalDispatchCenters.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tglobalDispatchCenter, err := client.GlobalDispatchCenters.New(context.TODO(), githubcomwithoursplatformsdkgo.GlobalDispatchCenterNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", globalDispatchCenter.ID)\n}\n',
      },
      cli: {
        method: 'global_dispatch_centers create',
        example: "oursprivacy global-dispatch-centers create \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/global-dispatch-centers \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/global-dispatch-centers/{id}',
    httpMethod: 'get',
    summary: '',
    description: 'Find a single global dispatch center by ID. Requires scope: globalDispatch:find',
    stainlessPath: '(resource) global_dispatch_centers > (method) retrieve',
    qualified: 'client.globalDispatchCenters.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.globalDispatchCenters.retrieve(id: string): { id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: object[]; name?: string; notes?: string; updatedAt?: string; }`\n\n**get** `/rest/v1/global-dispatch-centers/{id}`\n\nFind a single global dispatch center by ID. Requires scope: globalDispatch:find\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `isEnabled: boolean`\n  - `kind: string`\n  - `categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]`\n  - `name?: string`\n  - `notes?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst globalDispatchCenter = await client.globalDispatchCenters.retrieve('id');\n\nconsole.log(globalDispatchCenter);\n```",
    perLanguage: {
      typescript: {
        method: 'client.globalDispatchCenters.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst globalDispatchCenter = await client.globalDispatchCenters.retrieve('id');\n\nconsole.log(globalDispatchCenter.id);",
      },
      go: {
        method: 'client.GlobalDispatchCenters.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tglobalDispatchCenter, err := client.GlobalDispatchCenters.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", globalDispatchCenter.ID)\n}\n',
      },
      cli: {
        method: 'global_dispatch_centers retrieve',
        example: "oursprivacy global-dispatch-centers retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/global-dispatch-centers/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/rest/v1/global-dispatch-centers/{id}',
    httpMethod: 'patch',
    summary: '',
    description:
      'Partially update a global dispatch center. Only the fields you send are changed. Requires scope: globalDispatch:update',
    stainlessPath: '(resource) global_dispatch_centers > (method) update',
    qualified: 'client.globalDispatchCenters.update',
    params: [
      'id: string;',
      'categories?: { description?: string; destinationIds?: string[]; logic?: object; name?: string; priority?: number; }[];',
      'isEnabled?: boolean;',
      'name?: string;',
      'notes?: string;',
    ],
    response:
      '{ id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }',
    markdown:
      "## update\n\n`client.globalDispatchCenters.update(id: string, categories?: { description?: string; destinationIds?: string[]; logic?: object; name?: string; priority?: number; }[], isEnabled?: boolean, name?: string, notes?: string): { id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: object[]; name?: string; notes?: string; updatedAt?: string; }`\n\n**patch** `/rest/v1/global-dispatch-centers/{id}`\n\nPartially update a global dispatch center. Only the fields you send are changed. Requires scope: globalDispatch:update\n\n### Parameters\n\n- `id: string`\n\n- `categories?: { description?: string; destinationIds?: string[]; logic?: object; name?: string; priority?: number; }[]`\n  Full replacement of the categories list. Categories are sorted by priority on write and re-stamped 1..N — see the priority field. Omit to leave existing categories untouched.\n\n- `isEnabled?: boolean`\n  Toggle the dispatch center on/off without changing any other config.\n\n- `name?: string`\n  New display name for the center.\n\n- `notes?: string`\n  Replace the free-form notes.\n\n### Returns\n\n- `{ id: string; createdAt: string; isEnabled: boolean; kind: string; categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]; name?: string; notes?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `isEnabled: boolean`\n  - `kind: string`\n  - `categories?: { name: string; priority: number; description?: string; destinationIds?: string[]; logic?: object; }[]`\n  - `name?: string`\n  - `notes?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst globalDispatchCenter = await client.globalDispatchCenters.update('id');\n\nconsole.log(globalDispatchCenter);\n```",
    perLanguage: {
      typescript: {
        method: 'client.globalDispatchCenters.update',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst globalDispatchCenter = await client.globalDispatchCenters.update('id');\n\nconsole.log(globalDispatchCenter.id);",
      },
      go: {
        method: 'client.GlobalDispatchCenters.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tglobalDispatchCenter, err := client.GlobalDispatchCenters.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomwithoursplatformsdkgo.GlobalDispatchCenterUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", globalDispatchCenter.ID)\n}\n',
      },
      cli: {
        method: 'global_dispatch_centers update',
        example: "oursprivacy global-dispatch-centers update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/global-dispatch-centers/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/rest/v1/global-dispatch-centers/{id}',
    httpMethod: 'delete',
    summary: '',
    description: 'Delete a global dispatch center. Requires scope: globalDispatch:delete',
    stainlessPath: '(resource) global_dispatch_centers > (method) delete',
    qualified: 'client.globalDispatchCenters.delete',
    params: ['id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.globalDispatchCenters.delete(id: string): { id: string; deleted: boolean; }`\n\n**delete** `/rest/v1/global-dispatch-centers/{id}`\n\nDelete a global dispatch center. Requires scope: globalDispatch:delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst globalDispatchCenter = await client.globalDispatchCenters.delete('id');\n\nconsole.log(globalDispatchCenter);\n```",
    perLanguage: {
      typescript: {
        method: 'client.globalDispatchCenters.delete',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst globalDispatchCenter = await client.globalDispatchCenters.delete('id');\n\nconsole.log(globalDispatchCenter.id);",
      },
      go: {
        method: 'client.GlobalDispatchCenters.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tglobalDispatchCenter, err := client.GlobalDispatchCenters.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", globalDispatchCenter.ID)\n}\n',
      },
      cli: {
        method: 'global_dispatch_centers delete',
        example: "oursprivacy global-dispatch-centers delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/global-dispatch-centers/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/rest/v1/replay-settings',
    httpMethod: 'get',
    summary: '',
    description:
      'List the replay configurations on this account. Replay settings control which domains may capture session replays and where the capture script is hosted. Requires scope: replaySettings:list',
    stainlessPath: '(resource) replay_settings > (method) list',
    qualified: 'client.replaySettings.list',
    response:
      "{ entities: { id: string; createdAt: string; name: string; status: 'Disabled' | 'Enabled'; customDomain?: string; updatedAt?: string; whitelistDomains?: string[]; }[]; }",
    markdown:
      "## list\n\n`client.replaySettings.list(): { entities: object[]; }`\n\n**get** `/rest/v1/replay-settings`\n\nList the replay configurations on this account. Replay settings control which domains may capture session replays and where the capture script is hosted. Requires scope: replaySettings:list\n\n### Returns\n\n- `{ entities: { id: string; createdAt: string; name: string; status: 'Disabled' | 'Enabled'; customDomain?: string; updatedAt?: string; whitelistDomains?: string[]; }[]; }`\n\n  - `entities: { id: string; createdAt: string; name: string; status: 'Disabled' | 'Enabled'; customDomain?: string; updatedAt?: string; whitelistDomains?: string[]; }[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst replaySettings = await client.replaySettings.list();\n\nconsole.log(replaySettings);\n```",
    perLanguage: {
      typescript: {
        method: 'client.replaySettings.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst replaySettings = await client.replaySettings.list();\n\nconsole.log(replaySettings.entities);",
      },
      go: {
        method: 'client.ReplaySettings.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treplaySettings, err := client.ReplaySettings.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", replaySettings.Entities)\n}\n',
      },
      cli: {
        method: 'replay_settings list',
        example: "oursprivacy replay-settings list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/replay-settings \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/replay-settings',
    httpMethod: 'post',
    summary: '',
    description:
      'Create the replay configuration for this account. Each account is limited to one replay configuration — calls made when one already exists return HTTP 409 with the reason in the response `error` field. Requires scope: replaySettings:create',
    stainlessPath: '(resource) replay_settings > (method) create',
    qualified: 'client.replaySettings.create',
    params: [
      'customDomain?: string;',
      'name?: string;',
      "status?: 'Disabled' | 'Enabled';",
      'whitelistDomains?: string[];',
    ],
    response: '{ isSuccess: boolean; cause?: string; replaySettings?: object; }',
    markdown:
      "## create\n\n`client.replaySettings.create(customDomain?: string, name?: string, status?: 'Disabled' | 'Enabled', whitelistDomains?: string[]): { isSuccess: boolean; cause?: string; replaySettings?: object; }`\n\n**post** `/rest/v1/replay-settings`\n\nCreate the replay configuration for this account. Each account is limited to one replay configuration — calls made when one already exists return HTTP 409 with the reason in the response `error` field. Requires scope: replaySettings:create\n\n### Parameters\n\n- `customDomain?: string`\n  Optional custom domain (CNAME) for hosting the replay capture script. Leave null to use the default Ours Privacy domain.\n\n- `name?: string`\n  Human-readable label for this replay configuration. Shown in the dashboard. May be empty.\n\n- `status?: 'Disabled' | 'Enabled'`\n  Whether session replay capture is currently active. Set to \"Enabled\" to start capturing replays from whitelisted domains, or \"Disabled\" to pause capture without losing the configuration.\n\n- `whitelistDomains?: string[]`\n  Hostnames where session replay capture is permitted. Replays initiated from any host not in this list are dropped. PATCH replaces the list — partial updates are not merged.\n\n### Returns\n\n- `{ isSuccess: boolean; cause?: string; replaySettings?: object; }`\n\n  - `isSuccess: boolean`\n  - `cause?: string`\n  - `replaySettings?: object`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst replaySetting = await client.replaySettings.create();\n\nconsole.log(replaySetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.replaySettings.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst replaySetting = await client.replaySettings.create();\n\nconsole.log(replaySetting.isSuccess);",
      },
      go: {
        method: 'client.ReplaySettings.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treplaySetting, err := client.ReplaySettings.New(context.TODO(), githubcomwithoursplatformsdkgo.ReplaySettingNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", replaySetting.IsSuccess)\n}\n',
      },
      cli: {
        method: 'replay_settings create',
        example: "oursprivacy replay-settings create \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/replay-settings \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/replay-settings/{id}',
    httpMethod: 'get',
    summary: '',
    description:
      'Fetch a single replay configuration by ID, including its whitelisted domains and custom domain. Requires scope: replaySettings:find',
    stainlessPath: '(resource) replay_settings > (method) retrieve',
    qualified: 'client.replaySettings.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; createdAt: string; name: string; status: 'Disabled' | 'Enabled'; customDomain?: string; updatedAt?: string; whitelistDomains?: string[]; }",
    markdown:
      "## retrieve\n\n`client.replaySettings.retrieve(id: string): { id: string; createdAt: string; name: string; status: 'Disabled' | 'Enabled'; customDomain?: string; updatedAt?: string; whitelistDomains?: string[]; }`\n\n**get** `/rest/v1/replay-settings/{id}`\n\nFetch a single replay configuration by ID, including its whitelisted domains and custom domain. Requires scope: replaySettings:find\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; name: string; status: 'Disabled' | 'Enabled'; customDomain?: string; updatedAt?: string; whitelistDomains?: string[]; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `name: string`\n  - `status: 'Disabled' | 'Enabled'`\n  - `customDomain?: string`\n  - `updatedAt?: string`\n  - `whitelistDomains?: string[]`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst replaySetting = await client.replaySettings.retrieve('id');\n\nconsole.log(replaySetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.replaySettings.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst replaySetting = await client.replaySettings.retrieve('id');\n\nconsole.log(replaySetting.id);",
      },
      go: {
        method: 'client.ReplaySettings.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treplaySetting, err := client.ReplaySettings.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", replaySetting.ID)\n}\n',
      },
      cli: {
        method: 'replay_settings retrieve',
        example: "oursprivacy replay-settings retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/replay-settings/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/rest/v1/replay-settings/{id}',
    httpMethod: 'patch',
    summary: '',
    description:
      'Update one or more fields on an existing replay configuration. Only the fields you send are changed; omitted fields keep their current value. Note that `whitelistDomains` is replaced wholesale (not merged with the existing list). Requires scope: replaySettings:update',
    stainlessPath: '(resource) replay_settings > (method) update',
    qualified: 'client.replaySettings.update',
    params: [
      'id: string;',
      'customDomain?: string;',
      'name?: string;',
      "status?: 'Disabled' | 'Enabled';",
      'whitelistDomains?: string[];',
    ],
    response: '{ isSuccess: boolean; cause?: string; replaySettings?: object; }',
    markdown:
      "## update\n\n`client.replaySettings.update(id: string, customDomain?: string, name?: string, status?: 'Disabled' | 'Enabled', whitelistDomains?: string[]): { isSuccess: boolean; cause?: string; replaySettings?: object; }`\n\n**patch** `/rest/v1/replay-settings/{id}`\n\nUpdate one or more fields on an existing replay configuration. Only the fields you send are changed; omitted fields keep their current value. Note that `whitelistDomains` is replaced wholesale (not merged with the existing list). Requires scope: replaySettings:update\n\n### Parameters\n\n- `id: string`\n\n- `customDomain?: string`\n  Optional custom domain (CNAME) for hosting the replay capture script. Leave null to use the default Ours Privacy domain.\n\n- `name?: string`\n  Human-readable label for this replay configuration. Shown in the dashboard. May be empty.\n\n- `status?: 'Disabled' | 'Enabled'`\n  Whether session replay capture is currently active. Set to \"Enabled\" to start capturing replays from whitelisted domains, or \"Disabled\" to pause capture without losing the configuration.\n\n- `whitelistDomains?: string[]`\n  Hostnames where session replay capture is permitted. Replays initiated from any host not in this list are dropped. PATCH replaces the list — partial updates are not merged.\n\n### Returns\n\n- `{ isSuccess: boolean; cause?: string; replaySettings?: object; }`\n\n  - `isSuccess: boolean`\n  - `cause?: string`\n  - `replaySettings?: object`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst replaySetting = await client.replaySettings.update('id');\n\nconsole.log(replaySetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.replaySettings.update',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst replaySetting = await client.replaySettings.update('id');\n\nconsole.log(replaySetting.isSuccess);",
      },
      go: {
        method: 'client.ReplaySettings.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treplaySetting, err := client.ReplaySettings.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomwithoursplatformsdkgo.ReplaySettingUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", replaySetting.IsSuccess)\n}\n',
      },
      cli: {
        method: 'replay_settings update',
        example: "oursprivacy replay-settings update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/replay-settings/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/rest/v1/replay-settings/{id}',
    httpMethod: 'delete',
    summary: '',
    description:
      'Delete the replay configuration. Capture stops immediately for all whitelisted domains. Requires scope: replaySettings:delete',
    stainlessPath: '(resource) replay_settings > (method) delete',
    qualified: 'client.replaySettings.delete',
    params: ['id: string;'],
    response: '{ isSuccess: boolean; cause?: string; replaySettings?: object; }',
    markdown:
      "## delete\n\n`client.replaySettings.delete(id: string): { isSuccess: boolean; cause?: string; replaySettings?: object; }`\n\n**delete** `/rest/v1/replay-settings/{id}`\n\nDelete the replay configuration. Capture stops immediately for all whitelisted domains. Requires scope: replaySettings:delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ isSuccess: boolean; cause?: string; replaySettings?: object; }`\n\n  - `isSuccess: boolean`\n  - `cause?: string`\n  - `replaySettings?: object`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst replaySetting = await client.replaySettings.delete('id');\n\nconsole.log(replaySetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.replaySettings.delete',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst replaySetting = await client.replaySettings.delete('id');\n\nconsole.log(replaySetting.isSuccess);",
      },
      go: {
        method: 'client.ReplaySettings.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treplaySetting, err := client.ReplaySettings.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", replaySetting.IsSuccess)\n}\n',
      },
      cli: {
        method: 'replay_settings delete',
        example: "oursprivacy replay-settings delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/replay-settings/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/rest/v1/versions',
    httpMethod: 'get',
    summary: '',
    description:
      'List versions for this account, newest first. Supports cursor pagination and filtering by `isPublished`, `nameContains`, and `notesContains`. Combine filters with AND semantics. Requires scope: version:list',
    stainlessPath: '(resource) versions > (method) list',
    qualified: 'client.versions.list',
    params: [
      'cursor?: string;',
      "isPublished?: 'true' | 'false';",
      'limit?: number;',
      'nameContains?: string;',
      'notesContains?: string;',
    ],
    response:
      '{ entities: { id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; publishedAt?: string; }[]; pagination: { hasMore: boolean; nextCursor?: string; }; }',
    markdown:
      "## list\n\n`client.versions.list(cursor?: string, isPublished?: 'true' | 'false', limit?: number, nameContains?: string, notesContains?: string): { entities: object[]; pagination: object; }`\n\n**get** `/rest/v1/versions`\n\nList versions for this account, newest first. Supports cursor pagination and filtering by `isPublished`, `nameContains`, and `notesContains`. Combine filters with AND semantics. Requires scope: version:list\n\n### Parameters\n\n- `cursor?: string`\n  Opaque pagination cursor from pagination.nextCursor in the previous response. Do not decode or modify it. Malformed cursors return 400 Bad Request.\n\n- `isPublished?: 'true' | 'false'`\n  Filter to only published or unpublished versions.\n\n- `limit?: number`\n  Maximum number of versions to return. Defaults to 25; values below 1 are clamped to 1 and values above 100 are clamped to 100.\n\n- `nameContains?: string`\n  Case-insensitive substring match on the version name.\n\n- `notesContains?: string`\n  Case-insensitive substring match on the version notes.\n\n### Returns\n\n- `{ entities: { id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; publishedAt?: string; }[]; pagination: { hasMore: boolean; nextCursor?: string; }; }`\n\n  - `entities: { id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; publishedAt?: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor?: string; }`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst versions = await client.versions.list();\n\nconsole.log(versions);\n```",
    perLanguage: {
      typescript: {
        method: 'client.versions.list',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst versions = await client.versions.list();\n\nconsole.log(versions.entities);",
      },
      go: {
        method: 'client.Versions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tversions, err := client.Versions.List(context.TODO(), githubcomwithoursplatformsdkgo.VersionListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", versions.Entities)\n}\n',
      },
      cli: {
        method: 'versions list',
        example: "oursprivacy versions list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/versions \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/rest/v1/versions',
    httpMethod: 'post',
    summary: '',
    description:
      'Publish the current draft (i.e. all unpublished entity changes) as a new version. Returns the full Version on success. Returns HTTP 409 with the reason in the response `error` field when there are no draft changes to publish, when another publish is already in flight, or when the action otherwise conflicts with current state. To re-publish an existing version, use POST /rest/v1/versions/{id}/publish instead. Requires scope: version:publish',
    stainlessPath: '(resource) versions > (method) create',
    qualified: 'client.versions.create',
    params: [
      'includeAllowedEvents?: string[];',
      'includeConsentSettings?: string[];',
      'includeDestinations?: string[];',
      'includeExternalAllowedEventData?: string[];',
      'includeGlobalDispatchCenters?: string[];',
      'includeMappings?: string[];',
      'includeReplaySettings?: string[];',
      'includeSources?: string[];',
      'includeTagManagerTags?: string[];',
      'includeTagManagerTriggers?: string[];',
      'includeTagManagerVariables?: string[];',
      'name?: string;',
      'notes?: string;',
    ],
    response:
      '{ id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }',
    markdown:
      "## create\n\n`client.versions.create(includeAllowedEvents?: string[], includeConsentSettings?: string[], includeDestinations?: string[], includeExternalAllowedEventData?: string[], includeGlobalDispatchCenters?: string[], includeMappings?: string[], includeReplaySettings?: string[], includeSources?: string[], includeTagManagerTags?: string[], includeTagManagerTriggers?: string[], includeTagManagerVariables?: string[], name?: string, notes?: string): { id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }`\n\n**post** `/rest/v1/versions`\n\nPublish the current draft (i.e. all unpublished entity changes) as a new version. Returns the full Version on success. Returns HTTP 409 with the reason in the response `error` field when there are no draft changes to publish, when another publish is already in flight, or when the action otherwise conflicts with current state. To re-publish an existing version, use POST /rest/v1/versions/{id}/publish instead. Requires scope: version:publish\n\n### Parameters\n\n- `includeAllowedEvents?: string[]`\n\n- `includeConsentSettings?: string[]`\n\n- `includeDestinations?: string[]`\n\n- `includeExternalAllowedEventData?: string[]`\n\n- `includeGlobalDispatchCenters?: string[]`\n\n- `includeMappings?: string[]`\n\n- `includeReplaySettings?: string[]`\n\n- `includeSources?: string[]`\n\n- `includeTagManagerTags?: string[]`\n\n- `includeTagManagerTriggers?: string[]`\n\n- `includeTagManagerVariables?: string[]`\n\n- `name?: string`\n\n- `notes?: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `isPublished: boolean`\n  - `versionNumber: number`\n  - `name?: string`\n  - `notes?: string`\n  - `publishedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst version = await client.versions.create();\n\nconsole.log(version);\n```",
    perLanguage: {
      typescript: {
        method: 'client.versions.create',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst version = await client.versions.create();\n\nconsole.log(version.id);",
      },
      go: {
        method: 'client.Versions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tversion, err := client.Versions.New(context.TODO(), githubcomwithoursplatformsdkgo.VersionNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", version.ID)\n}\n',
      },
      cli: {
        method: 'versions create',
        example: "oursprivacy versions create \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/versions \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/rest/v1/versions/{id}',
    httpMethod: 'get',
    summary: '',
    description: 'Find a single version by ID. Requires scope: version:find',
    stainlessPath: '(resource) versions > (method) retrieve',
    qualified: 'client.versions.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.versions.retrieve(id: string): { id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }`\n\n**get** `/rest/v1/versions/{id}`\n\nFind a single version by ID. Requires scope: version:find\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `isPublished: boolean`\n  - `versionNumber: number`\n  - `name?: string`\n  - `notes?: string`\n  - `publishedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst version = await client.versions.retrieve('id');\n\nconsole.log(version);\n```",
    perLanguage: {
      typescript: {
        method: 'client.versions.retrieve',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst version = await client.versions.retrieve('id');\n\nconsole.log(version.id);",
      },
      go: {
        method: 'client.Versions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tversion, err := client.Versions.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", version.ID)\n}\n',
      },
      cli: {
        method: 'versions retrieve',
        example: "oursprivacy versions retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          'curl https://app.oursprivacy.com/rest/v1/versions/$ID \\\n    -H "Authorization: Bearer $OURS_PRIVACY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/rest/v1/versions/{id}',
    httpMethod: 'patch',
    summary: '',
    description:
      'Partially update a version. Only the fields you send are changed. Requires scope: version:update',
    stainlessPath: '(resource) versions > (method) update',
    qualified: 'client.versions.update',
    params: ['id: string;', 'name?: string;', 'notes?: string;'],
    response:
      '{ id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }',
    markdown:
      "## update\n\n`client.versions.update(id: string, name?: string, notes?: string): { id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }`\n\n**patch** `/rest/v1/versions/{id}`\n\nPartially update a version. Only the fields you send are changed. Requires scope: version:update\n\n### Parameters\n\n- `id: string`\n\n- `name?: string`\n\n- `notes?: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; isPublished: boolean; versionNumber: number; name?: string; notes?: string; publishedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `isPublished: boolean`\n  - `versionNumber: number`\n  - `name?: string`\n  - `notes?: string`\n  - `publishedAt?: string`\n\n### Example\n\n```typescript\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform();\n\nconst version = await client.versions.update('id');\n\nconsole.log(version);\n```",
    perLanguage: {
      typescript: {
        method: 'client.versions.update',
        example:
          "import OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst version = await client.versions.update('id');\n\nconsole.log(version.id);",
      },
      go: {
        method: 'client.Versions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tversion, err := client.Versions.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomwithoursplatformsdkgo.VersionUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", version.ID)\n}\n',
      },
      cli: {
        method: 'versions update',
        example: "oursprivacy versions update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      http: {
        example:
          "curl https://app.oursprivacy.com/rest/v1/versions/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OURS_PRIVACY_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Ours Privacy Platform CLI\n\nThe official CLI for the [Ours Privacy Platform REST API](https://docs.oursprivacy.com/docs/api).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install with-ours/tap/oursprivacy\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/with-ours/platform-cli/cmd/oursprivacy@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\noursprivacy [resource] <command> [flags...]\n~~~\n\n~~~sh\noursprivacy sources list \\\n  --api-key 'My API Key'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable   | Required |\n| ---------------------- | -------- |\n| `OURS_PRIVACY_API_KEY` | yes      |\n\n### Global flags\n\n- `--api-key` (can also be set with `OURS_PRIVACY_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\noursprivacy <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\noursprivacy <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\noursprivacy <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\noursprivacy <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\noursprivacy <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Ours Privacy Platform Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/githubcomwithoursplatformsdkgo-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../githubcomwithoursplatformsdkgo-go`.\n",
  },
  {
    language: 'go',
    content:
      '# Ours Privacy Platform Go API Library\n\n<a href="https://pkg.go.dev/github.com/with-ours/platform-sdk-go"><img src="https://pkg.go.dev/badge/github.com/with-ours/platform-sdk-go.svg" alt="Go Reference"></a>\n\nThe Ours Privacy Platform Go library provides convenient access to the [Ours Privacy Platform REST API](https://docs.oursprivacy.com/docs/api)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Ours Privacy Platform MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40oursprivacy%2Fplatform-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBvdXJzcHJpdmFjeS9wbGF0Zm9ybS1zZGstbWNwIl0sImVudiI6eyJPVVJTX1BSSVZBQ1lfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40oursprivacy%2Fplatform-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40oursprivacy%2Fplatform-sdk-mcp%22%5D%2C%22env%22%3A%7B%22OURS_PRIVACY_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/with-ours/platform-sdk-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/with-ours/platform-sdk-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/with-ours/platform-sdk-go"\n\t"github.com/with-ours/platform-sdk-go/option"\n)\n\nfunc main() {\n\tclient := githubcomwithoursplatformsdkgo.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("OURS_PRIVACY_API_KEY")\n\t)\n\tsources, err := client.Sources.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sources.Entities)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Sources.List(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/with-ours/platform-sdk-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Sources.List(context.TODO())\nif err != nil {\n\tvar apierr *githubcomwithoursplatformsdkgo.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/rest/v1/sources": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Sources.List(\n\tctx,\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := githubcomwithoursplatformsdkgo.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Sources.List(context.TODO(), option.WithMaxRetries(5))\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nsources, err := client.Sources.List(context.TODO(), option.WithResponseInto(&response))\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", sources)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/with-ours/platform-sdk-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Ours Privacy Platform TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@oursprivacy/platform-sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@oursprivacy/platform-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@oursprivacy/platform-sdk)\n\nThis library provides convenient access to the Ours Privacy Platform REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.oursprivacy.com](https://docs.oursprivacy.com/docs/api). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Ours Privacy Platform MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40oursprivacy%2Fplatform-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBvdXJzcHJpdmFjeS9wbGF0Zm9ybS1zZGstbWNwIl0sImVudiI6eyJPVVJTX1BSSVZBQ1lfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40oursprivacy%2Fplatform-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40oursprivacy%2Fplatform-sdk-mcp%22%5D%2C%22env%22%3A%7B%22OURS_PRIVACY_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @oursprivacy/platform-sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst sources = await client.sources.list();\n\nconsole.log(sources.entities);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  apiKey: process.env['OURS_PRIVACY_API_KEY'], // This is the default and can be omitted\n});\n\nconst sources: OursPrivacyPlatform.SourceListResponse = await client.sources.list();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst sources = await client.sources.list().catch(async (err) => {\n  if (err instanceof OursPrivacyPlatform.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new OursPrivacyPlatform({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.sources.list({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new OursPrivacyPlatform({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.sources.list({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new OursPrivacyPlatform();\n\nconst response = await client.sources.list().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: sources, response: raw } = await client.sources.list().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(sources.entities);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `OURS_PRIVACY_PLATFORM_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new OursPrivacyPlatform({\n  logger: logger.child({ name: 'OursPrivacyPlatform' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.sources.list({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\nimport fetch from 'my-fetch';\n\nconst client = new OursPrivacyPlatform({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new OursPrivacyPlatform({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport OursPrivacyPlatform from '@oursprivacy/platform-sdk';\n\nconst client = new OursPrivacyPlatform({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport OursPrivacyPlatform from 'npm:@oursprivacy/platform-sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new OursPrivacyPlatform({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/with-ours/platform-sdk-nodejs/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
