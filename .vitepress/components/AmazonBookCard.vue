<template>
  <div class="amazon-book-card">
    <div class="book-image">
      <img :src="book.imageUrl" :alt="book.title" loading="lazy">
    </div>
    <div class="book-details">
      <h3>{{ book.title }}</h3>
      <p class="author">by {{ book.author }}</p>
      <div class="book-meta">
        <span class="pages">{{ book.pages }} pages</span>
        <span class="publisher">{{ book.publisher }}</span>
      </div>
      <div class="price-info">
        <span class="price">From {{ book.priceFrom }}</span>
        <div class="formats">
          <span v-for="format in book.formats" :key="format" class="format-tag">
            {{ format }}
          </span>
        </div>
      </div>
      <a :href="amazonURL" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="amazon-buy-button">
        <svg class="amazon-icon" viewBox="0 0 24 24" width="16" height="16">
          <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.12.187-.068.324-.05.415.056.09.107.09.23 0 .371-.18.284-.526.567-1.037.847-3.086 1.691-6.46 2.538-10.123 2.538-4.214 0-8.017-.966-11.408-2.898-.438-.251-.644-.491-.615-.718.03-.226.146-.34.349-.342.203-.003.413.071.631.217z"/>
          <path d="M20.713 15.043c-.216-.297-.966-.14-1.337.035-.372.176-.961.516-.961.516s.035-.297.193-.297c.158 0 .666-.035.666-.035s-.193-.14-.351-.07c-.158.07-.544.35-.544.35s.07-.28.263-.35c.193-.07.754-.14.754-.14l-.193-.175s-.42.07-.578.175c-.158.105-.368.28-.368.28s.105-.28.298-.35c.193-.07.526-.105.526-.105l-.158-.21s-.386.07-.526.14c-.14.07-.298.21-.298.21s.07-.21.228-.28c.158-.07.456-.105.456-.105z"/>
        </svg>
        View on Amazon
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  asin: {
    type: String,
    required: true
  },
  associateId: {
    type: String,
    default: 'northernscrip-20'
  },
  book: {
    type: Object,
    required: true
  }
})

const amazonURL = computed(() => {
  return `https://www.amazon.com/dp/${props.asin}?tag=${props.associateId}`
})
</script>

<style scoped>
.amazon-book-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  margin: 1.5rem 0;
}

.amazon-book-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.book-image img {
  width: 120px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.book-details {
  flex: 1;
}

.book-details h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.3rem;
  line-height: 1.3;
}

.author {
  color: var(--vp-c-text-2);
  font-style: italic;
  margin: 0 0 1rem 0;
}

.book-meta {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.price-info {
  margin: 1rem 0;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-brand-dark);
}

.formats {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.format-tag {
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 4px;
  font-size: 0.8rem;
}

.amazon-buy-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #FF9900;
  color: white !important;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.amazon-buy-button:hover {
  background: #e68a00;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transform: translateY(-1px);
  text-decoration: none !important;
}

.amazon-icon {
  fill: currentColor;
}

@media (max-width: 768px) {
  .amazon-book-card {
    flex-direction: column;
    text-align: center;
  }
  
  .book-image img {
    margin: 0 auto;
  }
  
  .book-meta {
    justify-content: center;
  }
  
  .formats {
    justify-content: center;
  }
}
</style>