<template>
  <div>
    <!-- <Button
      @click="visible = false" 
      severity="info"
      label="Cancel"
      size="small"
      outlined
    /> -->

    <Dialog v-model:visible="visible" modal header="Payment Intent" class="w-full mx-3">
      <table>
        <thead>
          <tr class="flex flex-col">
            <td v-for="key in Object.keys(props.intent.data)" :key="key" class="text-start border-b">
              <div class="grid grid-cols-2">
                <div>
                  {{ key }}
                </div>
                <div>
                  {{ props.intent.data[key] }}
                </div>
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </Dialog>
  </div>
</template>

<script setup>
const visible = defineModel('visible')
const props = defineProps(['intent'])

</script>