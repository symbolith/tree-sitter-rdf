import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.trig.TreeSitterTrig;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterTrigTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterTrig.language()));
    }
}
