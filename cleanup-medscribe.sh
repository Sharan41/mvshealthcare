#!/bin/bash

# Medscribe-AI Repository Cleanup Script
# This script removes internal/instruction files that shouldn't be visible to recruiters/interviewers

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Medscribe-AI Repository Cleanup Script${NC}"
echo "=========================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository.${NC}"
    echo "Please navigate to your Medscribe-AI repository directory first."
    exit 1
fi

# Files to remove
FILES_TO_REMOVE=(
    "FIX_LEAKED_API_KEY.md"
    "COMPLIANCE_AUDIT_CHECKLIST.md"
    "PRIORITY_1_IMPLEMENTATION_COMPLETE.md"
    "RENDER_DEPLOYMENT.md"
)

# Optional: Remove sprint artifacts (uncomment if needed)
# DIRS_TO_REMOVE=(
#     "docs/sprint-artifacts"
# )

echo -e "${YELLOW}Files to be removed:${NC}"
for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        echo "  - $file"
    else
        echo -e "  - $file ${RED}(not found)${NC}"
    fi
done
echo ""

# Confirm before proceeding
read -p "Do you want to proceed with removing these files? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Cleanup cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Removing files...${NC}"

# Remove files
REMOVED_COUNT=0
for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        git rm "$file" 2>/dev/null || rm "$file"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Removed: $file${NC}"
            ((REMOVED_COUNT++))
        else
            echo -e "${RED}✗ Failed to remove: $file${NC}"
        fi
    fi
done

# Remove directories if specified
# for dir in "${DIRS_TO_REMOVE[@]}"; do
#     if [ -d "$dir" ]; then
#         git rm -r "$dir" 2>/dev/null || rm -r "$dir"
#         if [ $? -eq 0 ]; then
#             echo -e "${GREEN}✓ Removed directory: $dir${NC}"
#         fi
#     fi
# done

echo ""
if [ $REMOVED_COUNT -gt 0 ]; then
    echo -e "${GREEN}Successfully removed $REMOVED_COUNT file(s)${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Review the changes: git status"
    echo "2. Commit the changes: git commit -m 'Remove internal documentation files'"
    echo "3. Push to GitHub: git push origin main"
else
    echo -e "${YELLOW}No files were removed.${NC}"
fi

echo ""
echo -e "${GREEN}Cleanup complete!${NC}"


# Medscribe-AI Repository Cleanup Script
# This script removes internal/instruction files that shouldn't be visible to recruiters/interviewers

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Medscribe-AI Repository Cleanup Script${NC}"
echo "=========================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository.${NC}"
    echo "Please navigate to your Medscribe-AI repository directory first."
    exit 1
fi

# Files to remove
FILES_TO_REMOVE=(
    "FIX_LEAKED_API_KEY.md"
    "COMPLIANCE_AUDIT_CHECKLIST.md"
    "PRIORITY_1_IMPLEMENTATION_COMPLETE.md"
    "RENDER_DEPLOYMENT.md"
)

# Optional: Remove sprint artifacts (uncomment if needed)
# DIRS_TO_REMOVE=(
#     "docs/sprint-artifacts"
# )

echo -e "${YELLOW}Files to be removed:${NC}"
for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        echo "  - $file"
    else
        echo -e "  - $file ${RED}(not found)${NC}"
    fi
done
echo ""

# Confirm before proceeding
read -p "Do you want to proceed with removing these files? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Cleanup cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Removing files...${NC}"

# Remove files
REMOVED_COUNT=0
for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        git rm "$file" 2>/dev/null || rm "$file"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Removed: $file${NC}"
            ((REMOVED_COUNT++))
        else
            echo -e "${RED}✗ Failed to remove: $file${NC}"
        fi
    fi
done

# Remove directories if specified
# for dir in "${DIRS_TO_REMOVE[@]}"; do
#     if [ -d "$dir" ]; then
#         git rm -r "$dir" 2>/dev/null || rm -r "$dir"
#         if [ $? -eq 0 ]; then
#             echo -e "${GREEN}✓ Removed directory: $dir${NC}"
#         fi
#     fi
# done

echo ""
if [ $REMOVED_COUNT -gt 0 ]; then
    echo -e "${GREEN}Successfully removed $REMOVED_COUNT file(s)${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Review the changes: git status"
    echo "2. Commit the changes: git commit -m 'Remove internal documentation files'"
    echo "3. Push to GitHub: git push origin main"
else
    echo -e "${YELLOW}No files were removed.${NC}"
fi

echo ""
echo -e "${GREEN}Cleanup complete!${NC}"






