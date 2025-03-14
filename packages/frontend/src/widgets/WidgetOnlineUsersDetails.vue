<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div data-cy-mkw-onlineUsers :class="[$style.root, { _panel: !widgetProps.transparent, [$style.pad]: !widgetProps.transparent }]">
	<span :class="$style.text">
		<I18n v-if="onlineUsersCount" :src="i18n.ts.onlineUsersCount" textTag="span">
			<template #n><b style="color: #41b781;">{{ number(onlineUsersCount) }}</b></template>
		</I18n>
	</span>
	<div v-if="onlineUsersDetails" :class="$style.users">
		<div v-for="userDetail in onlineUsersDetails" :key="userDetail.username" :class="$style.row">
			<div :class="$style.name"><MkA :to="'/@' + userDetail.username">{{ userDetail.username }}</MkA></div>
			<div :class="$style.date">{{ userDetail.lastActiveDate }}</div>
		</div>
	</div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useInterval } from '@@/js/use-interval.js';
import { useWidgetPropsManager } from './widget.js';
import type { WidgetComponentEmits, WidgetComponentExpose, WidgetComponentProps } from './widget.js';
import type { GetFormResultType } from '@/utility/form.js';
import { misskeyApi, misskeyApiGet } from '@/utility/misskey-api.js';
import { i18n } from '@/i18n.js';
import number from '@/filters/number.js';

const name = 'onlineUsersDetails';

const widgetPropsDef = {
	transparent: {
		type: 'boolean' as const,
		default: true,
	},
};

type WidgetProps = GetFormResultType<typeof widgetPropsDef>;

const props = defineProps<WidgetComponentProps<WidgetProps>>();
const emit = defineEmits<WidgetComponentEmits<WidgetProps>>();

const { widgetProps, configure } = useWidgetPropsManager(name,
	widgetPropsDef,
	props,
	emit,
);

const onlineUsersCount = ref(0);
const onlineUsersDetails = ref<Array<{ username: string; lastActiveDate: Date | string; }>>([]);

const tick = () => {
	misskeyApiGet('get-online-users-count').then(res => {
		onlineUsersCount.value = res.count;
		onlineUsersDetails.value = res.details.map(detail => {
			const jst = new Date(new Date(detail.lastActiveDate).getTime() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
			if (Number.isNaN(jst.getTime())) {
				(detail.lastActiveDate as unknown as string) = '-';
			} else {
				(detail.lastActiveDate as unknown as string) = jst.getFullYear()
					+ '-' + ('0' + (jst.getMonth() + 1)).slice(-2)
					+ '-' + ('0' + jst.getDate()).slice(-2)
					+ ' ' + ('0' + jst.getHours()).slice(-2)
					+ ':' + ('0' + jst.getMinutes()).slice(-2)
					+ ':' + ('0' + jst.getSeconds()).slice(-2);
			}
			return detail;
		});
	});
};

useInterval(tick, 1000 * 15, {
	immediate: true,
	afterMounted: true,
});

defineExpose<WidgetComponentExpose>({
	name,
	configure,
	id: props.widget ? props.widget.id : null,
});
</script>

<style lang="scss" module>
.root {
	text-align: center;

	&.pad {
		padding: 16px 0;
	}
}

.text {
	color: var(--MI_THEME-fgTransparentWeak);
}

.users {
	margin-top: var(--MI-margin);
	text-align: left;
}

.row {
	display: grid;
	grid-template-columns: 1fr auto;
}

.date {
	text-align: right;
	white-space: nowrap;
}
</style>
