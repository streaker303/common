<template>
	<div class="navMenu">

		<template v-for="navMenu in roleData">
			<!-- 最后一级菜单 -->
			 <!-- v-if="navMenu.menus.length == 0" -->
			<el-table :show-header="false" :data="navMenu.menus" style="width: 100%;background-color: none;" :key="navMenu.modular">
				<el-table-column width="200px" prop="resourceName">
					<template slot-scope="scope">
						<label class="el-checkbox" v-for="list in scope.row.menus" :key="list.modular">
							<el-checkbox :label="list.modular" name="type">{{list.resourceName}}</el-checkbox>
						</label>
					</template>
				</el-table-column>
				<el-table-column></el-table-column>
			</el-table >

			<!-- 此菜单下还有子菜单 -->
			<!-- v-if="navMenu.menus.length > 0" -->
			<el-table  :show-header="false" :data="navMenu.menus" style="width: 100%;background-color: none;" :key="navMenu.modular">
				<el-table-column width="200px" prop="resourceName">
					<template slot-scope="scope">
						<label class="el-checkbox" v-for="list in scope.row.menus" :key="list.modular">
							<el-checkbox :label="list.modular" name="type">{{list.resourceName}}</el-checkbox>
						</label>
					</template>
				</el-table-column>
				<RoleData :roleData="navMenu.menus"></RoleData>
			</el-table >
		</template>

	</div>
</template>

<script>
	export default {
		name: 'RoleData',
		props: ['roleData'],
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style>
</style>
