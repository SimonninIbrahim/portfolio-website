from django.contrib import admin
from .models import Tool

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'tag', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'description', 'tag')
    list_filter = ('is_active',)
