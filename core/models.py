from django.db import models

class Tool(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_class = models.CharField(
        max_length=100,
        help_text="Example: fa-brands fa-python or fa-solid fa-file-word"
    )
    tag = models.CharField(max_length=50, blank=True, null=True)
    tag_icon_class = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Example: fa-solid fa-code"
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
