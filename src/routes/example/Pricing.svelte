<!-- src/routes/example/Pricing.svelte -->
<script lang="ts">
	import Html from '$lib/components/Html.svelte';
	import Head from '$lib/components/Head.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Body from '$lib/components/Body.svelte';
	import Container from '$lib/components/Container.svelte';
	import Section from '$lib/components/Section.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Button from '$lib/components/Button.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Row from '$lib/components/Row.svelte';
	import Column from '$lib/components/Column.svelte';

	const plans = [
		{
			title: 'Hobby',
			price: 29,
			highlighted: false,
			description: 'The perfect plan for getting started.',
			features: [
				'25 products',
				'Up to 10,000 subscribers',
				'Advanced analytics',
				'24-hour support response time'
			],
			buttonText: 'Get started today',
			buttonUrl: '#'
		},
		{
			title: 'Enterprise',
			price: 99,
			highlighted: true,
			description: 'Dedicated support and enterprise ready.',
			features: [
				'Unlimited products',
				'Unlimited subscribers',
				'Advanced analytics',
				'Dedicated support representative',
				'Marketing automations',
				'Custom integrations'
			],
			buttonText: 'Get started today',
			buttonUrl: '#'
		}
	];

	// Keep helper functions for conditional classes
	const getPlanSectionClass = (highlighted: boolean) =>
		`${
			highlighted
				? 'bg-[rgb(16,24,40)] border-[rgb(16,24,40)] text-gray-300 mb-[12px]'
				: 'bg-white border-gray-300 text-gray-600 mb-[24px]'
		} rounded-[8px] border border-solid p-[24px] text-left w-full`;

	const getPlanTitleClass = (highlighted: boolean) =>
		`${
			highlighted ? 'text-[rgb(124,134,255)]' : 'text-[rgb(79,70,229)]'
		} text-[14px] leading-[20px] font-semibold mb-[16px]`;

	const getPriceSpanClass = (highlighted: boolean) =>
		`${highlighted ? 'text-white' : 'text-[rgb(16,24,40)]'}`;
</script>

<Html>
	<Head />
	<Preview>Choose the right plan for you</Preview>
	<Body>
		<Container class="bg-white rounded-[8px] mx-auto max-w-[600px] p-[24px]">
			<Section class="mb-[42px]">
				<Heading class="text-[24px] leading-[32px] mb-[12px] text-center">
					Choose the right plan for you
				</Heading>
				<Text class="text-gray-500 text-[14px] leading-[20px] mx-auto max-w-[500px] text-center">
					Choose an affordable plan with top features to engage audiences, build loyalty, and boost
					sales.
				</Text>
			</Section>

			<Row class="pb-[24px]">
				{#each plans as plan (plan.title)}
					<Column style="padding-right: 10px; padding-left: 10px; vertical-align: top;">
						<Section class={getPlanSectionClass(plan.highlighted)}>
							<Text class={getPlanTitleClass(plan.highlighted)}>
								{plan.title}
							</Text>
							<Text class="text-[28px] font-bold mb-[8px] mt-0">
								<span class={getPriceSpanClass(plan.highlighted)}>
									${plan.price}
								</span>{' '}
								<span class="text-[14px] leading-[20px]">/ month</span>
							</Text>
							<Text class="mt-[12px] mb-[24px]">{plan.description}</Text>
							<ul class="text-[12px] leading-[20px] mb-[30px] pl-[14px]">
								{#each plan.features as feature (feature)}
									<li class="mb-[8px]">{feature}</li>
								{/each}
							</ul>
							<Button
								href={plan.buttonUrl}
								class="bg-indigo-600 rounded-[8px] box-border text-white inline-block font-semibold m-0 max-w-full p-[12px] text-center w-full"
							>
								{plan.buttonText}
							</Button>
						</Section>
					</Column>
				{/each}
			</Row>

			<Hr class="mt-0" />
			<Text class="text-gray-500 text-[12px] leading-[16px] font-medium mt-[30px] text-center">
				Customer Experience Research Team
			</Text>
		</Container>
	</Body>
</Html>
